import { User } from "../db/schema/user.schema.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../db/schema/product.schema.js";

export const addProduct = asyncHandler(async (req, res) => {
	try {
		const { name, date, quantity } = req.body;
		const userId = req.userId;
		const newProduct = await Product.create({
			name,
			receivedAt: date,
			quantity,
			owner: userId,
		});

		const user = await User.findById(userId);
		user.inventory.push(newProduct._id);
		await user.save();

		return res
			.status(201)
			.json(
				new ApiResponse(200, newProduct, "Product added successfully......")
			);
	} catch (error) {
		throw new ApiError(500, "Something went wrong while adding the product");
	}
});

export const updateProduct = asyncHandler(async (req, res) => {
	try {
		const { date, status, sent } = req.body;
		const productId = req.params.id;

		const updatedFields = {};

		if (date) {
			updatedFields.productDispatchedAt = date;
		}

		if (status !== undefined) {
			updatedFields.status = status;
		}

		if (sent !== undefined) {
			const product = await Product.findById(productId);
			updatedFields.pending = Math.max(0, product.pending - sent);
		}

		const product = await Product.findByIdAndUpdate(
			productId,
			{
				$set: updatedFields,
			},
			{ new: true }
		);
		return res
			.status(200)
			.json(
				new ApiResponse(200, product, "Product details updated successfully")
			);
	} catch (error) {
		throw new ApiError(500, "Something went wrong while updating the product");
	}
});

export const deleteProduct = asyncHandler(async (req, res) => {
	try {
		const productId = req.params.id;
		const product = await Product.findByIdAndDelete(productId);
		if (!product) {
			throw new ApiError(404, "Product not found");
		}
		return res
			.status(200)
			.json(new ApiResponse(200, product, "Product deleted successfully"));
	} catch (error) {
		throw new ApiError(500, "Something went wrong while deleting the product");
	}
});

export const getProducts = asyncHandler(async (req, res) => {
	try {
		const products = await Product.find();
		return res
			.status(200)
			.json(
				new ApiResponse(200, products, "All products retrieved successfully")
			);
	} catch (error) {
		throw new ApiError(
			500,
			"Something went wrong while retrieving all products"
		);
	}
});
