import { body } from 'express-validator';
import CitySchema from '../schemas/CitySchema.js';

export const validateRegisterForm = () => {
  return [
    body('username')
      .isLength({ min: 4 })
      .withMessage('username must be at least 4 chars long')
      .isLength({ max: 16 })
      .withMessage(' username must be less than 12 chars long')
      .exists()
      .withMessage('username is required')
      .trim()
      .matches(/^[A-Za-z0-9\_]+$/)
      .withMessage('username must be alphanumeric only')
      .escape(),
    body('email').isEmail().normalizeEmail().withMessage('Invalid Email').exists(),
    body('password')
      .isLength({ min: 5 })
      .withMessage('password must be at least 5 chars long')
      .isLength({ max: 30 })
      .withMessage('password must be at max 30 chars long')
      .exists(),
  ];
}

export const validateLoginForm = () => {
  return [
    body('username')
      .isLength({ min: 4 })
      .withMessage('username must be at least 4 chars long')
      .isLength({ max: 16 })
      .withMessage('username must be less than 12 chars long')
      .exists()
      .withMessage('username is required')
      .trim()
      .matches(/^[A-Za-z0-9\_]+$/)
      .withMessage('username must be alphanumeric only')
      .escape(),
    body('password')
      .isLength({ min: 5 })
      .withMessage('password must be at least 5 chars long')
      .isLength({ max: 30 })
      .withMessage('password must be at max 30 chars long')
      .exists(),
  ];
}

export const validateProfileUpdate = () => {
  return [
    body('username')
      .isLength({ min: 4 })
      .withMessage('username must be at least 4 chars long')
      .isLength({ max: 16 })
      .withMessage(' username must be less than 12 chars long')
      .exists()
      .withMessage('username is required')
      .trim()
      .matches(/^[A-Za-z0-9\_]+$/)
      .withMessage('username must be alphanumeric only')
      .escape(),
    body('email').isEmail().normalizeEmail().withMessage('Invalid Email').exists(),
  ];
}

export const validateSettingsUpdate = async () => {
  return [
    body(['defaultZipCode', 'secondaryZipCode'])
      .isPostalCode('any')
      .withMessage('Invalid Zip Code Found')
      .optional({ checkFalsy: true }),
    body(['defaultCity', 'secondaryCity']).custom(async cityName => {
      const validCity = await isValidCity(cityName);
      if (!validCity) {
        return Promise.reject();
      }
      return true;
    }).withMessage('Invalid City Name').optional({ checkFalsy: true })
  ];
}

const isValidCity = async (city) => {
  const exists = await CitySchema.exists({ name: city });
  return exists ? true : false;
}