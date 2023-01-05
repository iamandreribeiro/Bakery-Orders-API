import express from "express";
import { getClientOrder, postClient } from "../controllers/clientsController.js";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import { clientSchema } from "../models/clientModel.js";

const router = express.Router();

router.post("/clients", validateSchema(clientSchema), postClient);
router.get("/clients/:id/orders", getClientOrder);


export default router;