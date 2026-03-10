import { body } from "express-validator";

export const registerValidator = [
    body('full_name', "fullname should not be empty").not().isEmpty(),
    body('email', "invalid email").isEmail(),
    body('password', 'The minimum password length is 6 characters').isLength({ min: 6 }),
    body('mobile', "mobile must be of 10 digit").not().isLength({ min: 10, max: 10 }),
    body('gender', "gender must not be empty").not(),
    body('birthdate', "birthdate must be in proper date format").isDate(),
]

export const loginvalidator = [
    body('email', 'Invalid does not Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'The minimum password length is 6 characters').isLength({ min: 6 }),
]

export const createBookValidator = [
    body('title', "title should not be empty").notEmpty(),
    body('authorname', "authorname must not be empty").notEmpty(),
    body('quantity', "quantity must not be empty").notEmpty(),
    body('image-file').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('Please upload an image file');
    }
    return true;
  })
]