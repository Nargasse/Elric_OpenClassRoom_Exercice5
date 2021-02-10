const express = require('express');
const router = express.Router();

const sauceControl = require('../controllers/sauce');
const auth = require('../middleware/authentification');

router.post('/:id/like', auth, sauceControl.updateLikeStatus);

router.post('/', auth, sauceControl.addNewSauce);

router.put('/id:', auth, sauceControl.updateSauce);

router.delete('/id:', auth, sauceControl.deleteSauce);

router.get('/id:', auth, sauceControl.findOneSauce);

router.get('/', auth, sauceControl.findAllSauce);

module.exports = router;