const express = require('express');
const router = express.Router();
const { checkBreach } = require('../controllers/breachController');

router.post('/check-breach', checkBreach);

module.exports = router;