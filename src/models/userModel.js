import joi from "joi";

const userSchema = joi.object({
    "name": joi.string().required(),
    "adress": joi.string().required(),
    "phone": joi.string().min(10).max(11).required()
});