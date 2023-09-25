module.exports = (req, res, next) => {
    // req.body must have username or email and password
    if (!req.body) {
        return res.status(400).send({ code: 400, message: 'Request body is missing' });
    }

    const { username, email, password } = req.body;

    if (!username && !email) {
        return res.status(400).send({ code: 400, message: 'username or email is required' });
    }
    if (!password) {
        return res.status(400).send({ code: 400, message: 'password is required' });
    }
    next();
}