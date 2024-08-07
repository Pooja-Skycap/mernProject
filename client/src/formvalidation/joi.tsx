import Joi from "joi";

export const schema = Joi.object({
  title: Joi.string().required().label("Title").messages({
    "string.base": "Title must be a text string",
    "string.empty": "Title cannot be empty",
    "any.required": "Title is required",
  }),
});
