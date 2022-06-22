import Joi, { required } from "joi";

export const Message = Joi.object({
    from: Joi.string()
        .required(), 
        
    to: Joi.string()
        .required(),
    
    text: Joi.string()
        .required(),

    type: Joi.string()
        .required(),
    
    time: Joi.string()
        .required(),
});