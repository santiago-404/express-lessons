import joi from "joi"

const validator = (schema) => (payload) => 
  schema.validate(payload, {abortEarly: false});

const newBookSchema = joi.object({
  title: joi.string().required(),
  author: joi.string().required(),
  genre: joi.string().valid('horror', 'history', 'fiction', 'non-fiction', 'dystopian').insensitive().trim().max(20).required(),
  stock: joi.number().required()
})

const genreSchema = joi.object({
  genre: joi.string().valid('horror', 'history', 'fiction', 'non-fiction', 'dystopian').insensitive().trim().max(20)
})

const validateBookSchema = validator(newBookSchema);
const validateGenreSchema = validator(genreSchema);

export {validateBookSchema, validateGenreSchema};