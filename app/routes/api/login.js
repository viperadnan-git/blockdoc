const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const contract = require('../../contract');

const { Op } = require('sequelize');
const db = require('../../database');
const loginValidate = require('./middlewares/login.validate');
const signupValidate = require('./middlewares/signup.validate');
const config = require('../../config');
const multer = require('multer');

router.use(multer().any());

router.post('/login', loginValidate, async (req, res) => {
    const { email, password } = req.body;

    let user;
    if (email.includes('@')) {
        user = await db.User.findOne({ where: { email } });
    }
    else {
        user = await db.User.findOne({ where: { username: email } });
    };

    if (!user) {
        return res.status(404).send({ code: 404, message: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
        return res.status(404).send({ code: 404, message: 'Invalid password' });
    }

    const token = jwt.sign({
        id: user.id,
        username: user.username,
        email: user.email,
        address: user.public_key,
        private_key: user.private_key,
    }, config.jwt.secret, { expiresIn: config.jwt.expires_in });
    res.send({ code: 200, token });
});

router.post('/signup', signupValidate, async (req, res) => {
    const { username, name, email, password } = req.body;
    const user = await db.User.findOne({ where: { [Op.or]: [{ username }, { email }] } });
    if (user) {
        return res.status(400).send({ code: 400, message: 'Username or Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const { privateKey: private_key, address: public_key } = contract.createWallet();
    await db.User.create({
        username,
        name,
        email,
        password_hash: hashedPassword,
        private_key,
        public_key,
    });
    await contract.createUser(username, public_key);
    res.status(200).json({ code: 200, message: 'User created' })
});

module.exports = router;