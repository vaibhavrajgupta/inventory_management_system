import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = Router();

router.route("/get").get(getProducts);
router.use(verifyToken);
router.route("/add").post(addProduct);
router.route("/update/:id").patch(updateProduct);
router.route("/delete/:id").delete(deleteProduct);

export default router;
