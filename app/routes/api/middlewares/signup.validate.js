module.exports = (req, res, next) => {
    // req.body must have username, name, email and password
    if (!req.body) {
        return res.status(400).send({ code: 400, message: 'Request body is missing' });
    }

    const { username, name, email, password } = req.body;

    if (!username) {
        return res.status(400).send({ code: 400, message: 'username is required' });
    }

    if (!name) {
        return res.status(400).send({ code: 400, message: 'name is required' });
    }

    if (!email) {
        return res.status(400).send({ code: 400, message: 'email is required' });
    }

    if (!password) {
        return res.status(400).send({ code: 400, message: 'password is required' });
    }

    next();
};