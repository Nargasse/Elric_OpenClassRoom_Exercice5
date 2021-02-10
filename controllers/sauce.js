const Sauce = require('../models/sauce');

exports.findAllSauce = (request, response, next) => {
    Sauce.find()
    .then(sauces => response.status(200).json(sauces))
    .catch(error => response.status(400).json({ error }));
};

exports.findOneSauce = (request, response, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
};

exports.addNewSauce = (request, response, next) => {
    console.log(req);
    next();
};

exports.updateSauce = (request, response, next) => {

};

exports.deleteSauce = (request, response, next) => {

};

exports.updateLikeStatus = (request, response, next) => {

};