import express from "express";
import { postCake } from "../controllers/cakesController.js";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import { cakeSchema } from "../models/cakeModel.js";

const router = express.Router();

router.post("/cakes", validateSchema(cakeSchema), postCake);

export default router;