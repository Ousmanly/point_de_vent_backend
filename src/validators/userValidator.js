import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import UserService from '../Services/UserService.js';
const addRequestUserValidator = [
  check('nom')
    .not()
    .isEmpty()
    .withMessage('name is required!')
    .bail()
    .isString()
    .withMessage("name can't be a number!")
    .bail()
    .isLength({ min: 3 })
    .withMessage('name must be at least 3 characters long!')
    .bail(),
  check('mot_de_pass')
    .not()
    .isEmpty()
    .withMessage('pass word is required!')
    .bail()
    .isLength({ min: 4 })
    .withMessage('pass word must be at least 4 characters long!')
    .bail(),
  check('role')
    .optional()
    .custom(async (value) => {
      const validRole = ['ADMIN', 'CAISSIER'];
      if (value && !validRole.includes(value)) {
        throw new Error('role must be "ADMIN", or "CAISSIER"!');
      }
      return true;
    })
    .bail(),
  check('email')
    .not()
    .isEmpty()
    .withMessage('email is required!')
    .bail()
    .isEmail()
    .withMessage("enter email valid!")
    .bail()
    .custom(async (value) => {
      const emailExists = await UserService.checkUser(value);
      if (emailExists) {
        throw new Error('This email is already exist!');
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];
const updateUserValidatore = [
  check('id')
    .not()
    .isEmpty()
    .withMessage('Id is required!')
    .bail()
    .isInt()
    .withMessage('Id must be a number!')
    .bail()
    .custom(async (value) => {
      const id = parseInt(value)
      const idExists = await UserService.checkUserById(id);
      if (!idExists) {
        throw new Error('User not found!');
      }
      return true;
    })
    .bail(),
  check('nom')
    .not()
    .isEmpty()
    .withMessage('name is required!')
    .bail()
    .isString()
    .withMessage("name can't be a number!")
    .bail()
    .isLength({ min: 3 })
    .withMessage('name must be at least 3 characters long!')
    .bail(),
  check('mot_de_pass')
    .not()
    .isEmpty()
    .withMessage('pass word is required!')
    .bail()
    .isLength({ min: 4 })
    .withMessage('pass word must be at least 4 characters long!')
    .bail(),
  check('role')
    .optional()
    .custom(async (value) => {
      const validRole = ['ADMIN', 'CAISSIER'];
      if (value && !validRole.includes(value)) {
        throw new Error('role must be "ADMIN", or "CAISSIER"!');
      }
      return true;
    })
    .bail(),
  check('email')
    .not()
    .isEmpty()
    .withMessage('email is required!')
    .bail()
    .isEmail()
    .withMessage("enter email valid!")
    .bail()
    .isLength({ min: 3 })
    .withMessage('email must be at least 3 characters long!')
    .bail()
    .custom(async (value, { req }) => {
      const id = req.params.id;
      const result = await UserService.checkUser(value, parseInt(id));
      if (result.length !== 0) {
        throw new Error('This email is already exist!');
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];
const deleteUserValidatore = [
  check('id')
    .not()
    .isEmpty()
    .withMessage('Id is required!')
    .bail()
    .isInt()
    .withMessage('Id must be a number!')
    .bail()
    .custom(async (value) => {
      const id = parseInt(value)
      const idExists = await UserService.checkUserById(id);
      if (!idExists) {
        throw new Error('User not found!');
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];

export {
  addRequestUserValidator,
  updateUserValidatore,
  deleteUserValidatore
};
// export {
//   addRequestCategoryValidatore,
//   deleteRequestCategoryValidatore,
//   updateRequestCategoryValidatore,
// };
