/* eslint-disable no-unused-vars */

import { Navigate, useNavigate } from "react-router-dom";
import apiRequest from "../lib/apiRequest";
import { useState } from "react";

const AddProduct = () => {

    const navigate = useNavigate();
    const [error, setError] = useState("");

	const submitHandler = async (e) => {
		e.preventDefault();
        setError("");
		const formData = new FormData(e.target);
		const name = formData.get("name");
		const date = formData.get("date");
		const quantity = formData.get("quantity");
        
        try {
            const res = await apiRequest.post("/product/add",{name, date, quantity});
            navigate("/");
        } catch (error) {
            setError(error.response.data.message);
        }
        
	};

	return (
		<form onSubmit={submitHandler}>
			<div className="mb-4">
				<label htmlFor="name" className="block text-gray-700 font-bold mb-2">
					Name
				</label>
				<input
					name="name"
					type="text"
					id="name"
					className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="receivedAt"
					className="block text-gray-700 font-bold mb-2"
				>
					Received At :
				</label>
				<input
					name="date"
					type="date"
					pattern="\d{6}"
					id="receivedAt"
					className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
				/>
			</div>
			<div className="mb-4">
				<label
					htmlFor="quantity"
					className="block text-gray-700 font-bold mb-2"
				>
					Quantity
				</label>
				<input
					name="quantity"
					type="number"
					id="quantity"
					className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
				/>
			</div>
			<button
				type="submit"
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			>
				Submit
			</button>
		</form>
	);
};
export default AddProduct;
