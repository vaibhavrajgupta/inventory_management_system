import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		receivedAt: {
			type: Date,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		productDispatchedAt: {
			type: Date,
			default: null,
		},
		pending: {
			type: Number,
			default: function () {
				return this.quantity;
			},
		},
		status: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

export const Product = mongoose.model("Product", productSchema);
