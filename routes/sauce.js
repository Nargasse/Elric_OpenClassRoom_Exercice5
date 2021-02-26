const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');
const sauceControl = require('../controllers/sauce');
const auth = require('../middleware/authentification');

router.post('/:id/like', auth, sauceControl.updateLikeStatus);

router.post('/', auth, multer, sauceControl.addNewSauce);

router.put('/:id', auth, multer, sauceControl.updateSauce);

router.delete('/:id', auth, sauceControl.deleteSauce);

router.get('/', auth, sauceControl.findAllSauce);

router.get('/:id', auth, sauceControl.findOneSauce);

module.exports = router;