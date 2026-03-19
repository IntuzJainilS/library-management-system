import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validateResult = (req: Request, res: Response, next: NextFunction) => {
  // console.log("-------------------123", req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const registerValidator = [
  body('full_name', "fullname should not be empty").not().isEmpty(),
  body('email', "invalid email").isEmail(),
  body('password', 'The minimum password length is 6 characters').isLength({ min: 6 }),
  body('mobile', "mobile must be of 10 digit").isLength({ min: 10, max: 10 }),
  body('gender', "gender must not be empty").not(),
  body('birthdate', "birthdate must be in proper date format").isDate(),
  validateResult,
]

export const loginvalidator = [
  body('email', 'Invalid!, enail does not Empty').not().isEmpty(),
  body('email', 'Invalid email').isEmail(),
  body('password', 'The minimum password length is 6 characters').isLength({ min: 6 }),
  validateResult,
]

export const createBookValidator = [
  body('title', "title should not be empty").notEmpty(),
  body('authorname', "authorname must not be empty").notEmpty(),
  body('quantity', "quantity must not be empty").notEmpty(),
  body('description', "description must not be empty").notEmpty(),
  body('image-file').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('Please upload an image file');
    }
    return true;
  }),
  validateResult,
]