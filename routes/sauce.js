const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');
const sauceControl = require('../controllers/sauce');
const auth = require('../middleware/authentification');
const rateLimiter = require('../middleware/retry-limiter');

router.post('/:id/like', rateLimiter, auth, sauceControl.updateLikeStatus);

router.post('/', rateLimiter, auth, multer, sauceControl.addNewSauce);

router.put('/:id', rateLimiter, auth, multer, sauceControl.updateSauce);

router.delete('/:id', rateLimiter, auth, sauceControl.deleteSauce);

router.get('/', rateLimiter, auth, sauceControl.findAllSauce);

router.get('/:id', rateLimiter, auth, sauceControl.findOneSauce);

module.exports = router;