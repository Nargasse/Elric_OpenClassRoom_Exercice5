const Sauce = require('../models/sauce');
const fileSys = require('fs');

exports.findAllSauce = (request, response, next) => {
    Sauce.find()
    .then(sauces => response.status(200).json(sauces))
    .catch(error => response.status(400).json({ error }));
};

exports.findOneSauce = (request, response, next) => {
    Sauce.findOne({ _id: request.params.id })
    .then(sauce => response.status(200).json(sauce))
    .catch(error => response.status(404).json({ error }));
};

exports.addNewSauce = (request, response, next) => {
    const sauceObject = JSON.parse(request.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${request.protocol}://${request.get('host')}/images/${request.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    })
    sauce.save()
    .then(() => response.status(201).json({ message: 'Sauce enregistrée' }))
    .catch(error => response.status(400).json ({ error }))
};

exports.updateSauce = (request, response, next) => {
    let sauceObject = Object
    if (request.file) {
        Sauce.findOne( { _id: request.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images')[1];
            fileSys.unlink(`images/${filename}`);
        })
        sauceObject = { 
        ...JSON.parse(request.body.sauce),
        imageUrl: `${request.protocol}://${request.get('host')}/images/${request.file.filename}`
        }
    } else {
        sauceObject = { ...request.body };
    }
    Sauce.updateOne({ _id: request.params.id }, {...sauceObject, _id: request.params.id})
    .then(() => response.status(200).json({message: 'Sauce modifiée' }))
    .catch(() => response.status(400).json({ error }));
};

exports.deleteSauce = (request, response, next) => {
    Sauce.findOne( { _id: request.params.id })
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fileSys.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: request.params.id })
            .then(() => response.status(200).json({ message: 'Sauce supprimé ! :(' }))
            .catch(error => response.status(404).json({ error }));
        })
    })
    .catch(error => response.status(500).json({error}));

};

exports.updateLikeStatus = (request, response, next) => {
    console.log(request.body.userId);
    Sauce.findOne({ _id: request.params.id })
    .then(sauce => {
        console.log(sauce);
        let newTableauLike = [];
        let newTableauDislike = [];
        console.log('user like = ' + request.body.like)
        for (let utilisateur of sauce.usersLiked) {
            console.log(utilisateur + ' ? ' + request.body.userId);
            if (utilisateur == request.body.userId) { //Si on trouve l'utilisateur déjà présent dans le tableau,
                sauce.likes --; //On enlève un like et on ne le sauvegarde pas dans le nouveau.
            } else {
                newTableauLike.push(utilisateur); //Le reste du tableau est copié à l'identique.
            }
        }
        if (request.body.like == 1) { //Si l'utilisateur aime la sauce
            sauce.likes ++; //On ajoute un like
            newTableauLike.push(request.body.userId); //Et on le (re)rajoute dans le tableau.
        }
        sauce.usersLiked = newTableauLike; //Le tableau est mis à jour avec les modifications.

        for (let utilisateur of sauce.usersDisliked) {
            if (utilisateur == request.body.userId) {
                sauce.dislikes --;
            } else {
                newTableauDislike.push(utilisateur);
            }
        }
        if (request.body.like == -1) {
            sauce.dislikes ++;
            newTableauDislike.push(request.body.userId);
        }
        sauce.usersDisliked = newTableauDislike;

        sauce.save();
        response.status(201).json({ message: 'likes mis à jour' })
    })
    .catch(error => response.status(500).json({error}));
};