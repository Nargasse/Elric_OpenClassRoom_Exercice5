const bcrypt = require('bcrypt');
const webToken = require('jsonwebtoken');

const User = require('../models/user');

exports.validateUser = (request, response, next) => {
    User.findOne({ email: request.body.email })
    .then(user => {
        if (!user) {
            return response.status(401).json({ error });
        }
        bcrypt.compare(request.body.password, user.password)
        .then(isSamePassword => {
            if (!isSamePassword) {
                return response.status(401).json({ error });
            } else {
                response.status(200).json({
                    userId:user._id,
                    token: webToken.sign(
                        { userId: user._id },
                        ('THE_DEFINITION_OF_FASCINATION_IS_BROADCASTING_EFFECTIVELY_AT_THE_CROSSING_OF_MY_RESIGNATION'),
                        { expiresIn: '13h'},
                    )
                })
            }
        })
        .catch(error => response.status(500).json({ error }))
    })
    .catch(error => response.status(500).json({ error }));
};

exports.createUser = (request, response, next) => { 
    bcrypt.hash(request.body.password, 10)
    .then(hash => {
        const user = new User ({
            email: request.body.email,
            password: hash,
        });
        user.save()
        .then(() => response.status(201).json({ message: 'Utilisateur enregistré' }))
        .catch(error => response.status(400).json ({ error }))
    })
    .catch(error => response.status(500).json({ error }));
};