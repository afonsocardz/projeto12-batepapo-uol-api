import Joi from "joi";

export const Participant = Joi.object({
    name: Joi.string()
        .required(),

    lastStatus: Joi.date()
        .max("now")
        .required()
});