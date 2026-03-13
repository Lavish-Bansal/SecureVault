const express = require('express');
const router = express.Router();
const { checkSecurityHeaders } = require('../controllers/securityHeaderController');

router.post('/check-headers', checkSecurityHeaders);

module.exports = router;