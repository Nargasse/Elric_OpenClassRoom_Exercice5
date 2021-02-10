const express = require('express');
const router = express.Router();

const authControl = require('../controllers/auth');

router.post('/signup', authControl.createUser);
router.post('/login', authControl.validateUser);

module.exports = router;