import jwt from "jsonwebtoken";
import { User } from "../db/schema/user.schema.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const register = asyncHandler(async (req, res) => {
	try {
		const { email, username, password } = req.body;

		if ([email, username, password].some((field) => field?.trim() === "")) {
			throw new ApiError(400, "All fields are required");
		}

		const existedUser = await User.findOne({
			$or: [{ username }, { email }],
		});

		if (existedUser) {
			throw new ApiError(409, "User with email or username already exists");
		}

		const user = await User.create({
			username: username.toLowerCase(),
			email,
			password,
		});

		const createdUser = await User.findById(user._id);
		if (!createdUser)
			throw new ApiError(
				500,
				"Something went wrong while registering the user"
			);

		return res
			.status(201)
			.json(new ApiResponse(200, createdUser, "User Registered Successfully"));
	} catch (error) {
		throw new ApiError(500, "Something went wrong while creating the user");
	}
});

export const login = asyncHandler(async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email) {
			throw new ApiError(400, "email is required");
		}

		const user = await User.findOne({ email });

		if (!user) {
			throw new ApiError(404, "User does not exist");
		}

		const isValidPassword = await user.isPasswordCorrect(password);
		if (!isValidPassword)
			throw new ApiError(401, "Invalid User Credentials....");

		const age = 1000 * 60 * 60 * 24 * 7;

		const token = jwt.sign(
			{ id: user._id, isAdmin: true },
			process.env.JWT_SECRET_KEY,
			{ expiresIn: age }
		);

		const loggedInUser = await User.findById(user._id).select("-password ");

		const options = {
			httpOnly: true,
			secure: true,
			maxAge: age,
		};

		return res
			.status(200)
			.cookie("token", token, options)
			.json(
				new ApiResponse(
					200,
					{ user: loggedInUser },
					"User LoggedInn Successfully"
				)
			);
	} catch (error) {
		throw new ApiError(500, "Something went wrong while logging inn the user");
	}
});

export const logout = asyncHandler(async (req, res) => {
	try {
		const options = {
			httpOnly: true,
			secure: true,
		};

		return res
			.status(200)
			.clearCookie("token", options)
			.json(new ApiResponse(200, {}, "User Logged Out"));
	} catch (error) {
		throw new ApiError(500, "Something went wrong while log out user");
	}
});
