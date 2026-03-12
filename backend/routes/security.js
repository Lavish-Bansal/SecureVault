const express = require('express');
const router = express.Router();
const { checkSecurityHeaders } = require('../controllers/securityController');

router.post('/check-headers', checkSecurityHeaders);

module.exports = router;