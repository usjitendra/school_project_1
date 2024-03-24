
const {body, validationResult } = require('express-validator');

const validate = [
    body('name')
        .isLength({ min: 2 }).withMessage('name must be at 2 characters long')
        .trim(),
    body('student_email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    // Validate father_name field
    body('father_name')
        .notEmpty().withMessage('Father\'s name is required')
        .isLength({ min: 2 }).withMessage('Father\'s name must be at least 2 characters long')
        .trim(),
        body('class')
        .notEmpty().withMessage('Class is required')
        .trim(),
    body('last_name')
        .notEmpty().withMessage('Last name is required')
        .trim(),
    body('address')
        .notEmpty().withMessage('Address is required')
        .trim(),
    body('permanent_address')
        .notEmpty().withMessage('Permanent address is required')
        .trim(),
        body('mother_name')
        .notEmpty().withMessage('Mother\'s name is required')
        .trim(),
    body('father_occupation')
        .notEmpty().withMessage('Father\'s occupation is required')
        .trim(),
    body('mother_occupation')
        .trim(),
    body('student_mobile_number')
        .notEmpty().withMessage('Student mobile number is required')
        .isNumeric().withMessage('Student mobile number must be numeric'),
    body('father_mobile_number')
        .notEmpty().withMessage('Father mobile number is required')
        .isNumeric().withMessage('Father mobile number must be numeric'),
    body('mother_mobile_number')
        .notEmpty().withMessage('Mother mobile number is required')
        .isNumeric().withMessage('Mother mobile number must be numeric'),
    body('student_email')
        .isEmail().optional().withMessage('Invalid student email format'),
    body('father_email')
        .isEmail().optional().withMessage('Invalid father email format'),
    body('mother_email')
        .isEmail().optional().withMessage('Invalid mother email format'),
   
    (req, res, next) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        } else {
            next();
        }

    }
]


module.exports={validate}