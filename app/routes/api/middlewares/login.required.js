const jwt = require('jsonwebtoken');
const config = require('../../../config');

module.exports = (req, res, next) => {
    // req.headers must have authorization header set with JWT token
    if (!req.headers.authorization) {
        return res.status(401).send({ code: 401, message: 'No authorization headers.' });
    }

    const token_bearer = req.headers.authorization.split(' ');

    if (token_bearer.length != 2) {
        return res.status(401).send({ code: 401, message: 'Malformed token.' });
    }

    const token = token_bearer[1];

    return jwt.verify(token, config.jwt.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ code: 401, message: 'Failed to authenticate.' });
        }

        req.user = decoded;
        return next();
    }

    );
}