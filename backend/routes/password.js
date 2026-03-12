const express = require('express');
const router = express.Router();
const { checkPasswordStrength } = require('../controllers/passwordStrengthController');

router.post('/check-strength', checkPasswordStrength);

module.exports = router;