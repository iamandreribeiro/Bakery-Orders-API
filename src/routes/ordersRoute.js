import express from "express";
import { getAllOrders, getOrderById, postOrder } from "../controllers/ordersController.js";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import { orderSchema } from "../models/orderModel.js";

const router = express.Router();

router.post("/order", validateSchema(orderSchema), postOrder);
router.get("/orders", getAllOrders);
router.get("/orders/:id", getOrderById);

export default router;