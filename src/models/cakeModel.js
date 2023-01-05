import joi from "joi";

const cakeSchema = joi.object({
    "name": joi.string().min(2).required(),
    "price": joi.number().min(1).required(),
    "image": joi.string().regex(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/).required(),
    "description": joi.string()
});