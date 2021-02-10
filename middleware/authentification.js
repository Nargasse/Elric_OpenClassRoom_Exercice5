const webToken = require('jsonwebtoken');

module.exports = (request, response, next) => {
    try {
        const token = req.headers.authorization.split('')[1];
        const decodedToken = webToken.verify(token, 'THE_DEFINITION_OF_FASCINATION_IS_BROADCASTING_EFFECTIVELY_AT_THE_CROSSING_OF_MY_RESIGNATION');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw new Error();
        } else {
            next();
        }
    } catch (error) {
        response.status(401).json({ error });
    }
}