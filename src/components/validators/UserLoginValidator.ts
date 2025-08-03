import * as Joi from "joi";

const UserLoginValidator=Joi.object().keys({
    email: Joi.string()
        // .email({ tlds: { allow: ['com', 'org', 'net', 'io'] } })
        .email({ tlds: {  } })
        .required()
        .messages({
            "string.email": "Please provide a valid email address",
        }),
    password: Joi.string().min(6).max(12).required().messages({
        "string.min": "Password must be at least 6 characters long",
        "string.max": "Password must be no longer than 12 characters",
    }),
})
export { UserLoginValidator};
