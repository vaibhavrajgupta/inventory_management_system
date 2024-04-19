import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { addProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = Router();

router.route("/getProducts").get(getProducts);
router.use(verifyToken);
router.route("/addProduct").post(addProduct);
router.route("/updateProduct/:id").patch(updateProduct);
router.route("/deleteProduct/:id").post(deleteProduct);

export default router;
