  const { body, validationResult } = require("express-validator")
  const validate = {}

validate.contactRules = () => {
  return [
    // firstname is required and must be a string
    body('firstName')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Please provide a first name.'),

    // lastname is required and must be a string
    body('lastName')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Please provide a last name.'),

    // valid email is required
    body('email')
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage('A valid email is required.'),

    // favouriteColor is required
    body('favouriteColor')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Favourite color is required.'),

    // birthday is optional but must be a string
    body('birthday')
      .optional()
      .trim()
      .escape()
      .isString()
      .withMessage('Birthday must be a string.'),
  ];
};

// Middleware to check contact data
validate.checkContactData = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(412).json({
            success: false,
            message: 'Validation failed',
            data: errors.array(),
        });
    }
    next();
};



module.exports = validate;
