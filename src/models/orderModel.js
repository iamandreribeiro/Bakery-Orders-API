import joi from "joi";

export const orderSchema = joi.object({
    "quantity": joi.number().min(1).max(4),
    "totalPrice": joi.number().required()
});