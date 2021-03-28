const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
    windowMs: 1000*60*60,
    max: 120,
    message: 'Limite de requete au serveur exceder, retenter plus tard.',
    headers: true,
})