const express = require('express');
const router = express.Router();

const authControl = require('../controllers/auth');
const rateLimiter = require('../middleware/retry-limiter');

router.post('/signup', rateLimiter, authControl.createUser);
router.post('/login', rateLimiter, authControl.validateUser);

module.exports = router;