// create a login and sign up api endpoints and store and fetch data from database

const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DocumentRegistryClient = require('../../contract');

const db = require('../../database');
const { Op } = require('sequelize');
const loginValidate = require('./middlewares/login.validate');
const signupValidate = require('./middlewares/signup.validate');

router.post('/login', loginValidate, async (req, res) => {
    const { email, username, password } = req.body;

    let user;
    if (email) {
        user = await db.User.findOne({ where: { email } });
    } else {
        user = await db.User.findOne({ where: { username } });
    }
    
    if (!user) {
        return res.status(404).send({ code:404, message: 'User not found' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(404).send({ code:404, message: 'Invalid password' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.send({ token });
});

router.post('/signup', signupValidate, async (req, res) => {
    const { username, name, email, password } = req.body;
    const user = await db.User.findOne({ where: { email } });
    if (user) {
        return res.status(409).send({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const { privateKey: private_key, address: public_key } = DocumentRegistryClient.createNewWalletAndReturnPrivateKeyAndAddress();
    await db.User.create({
        username,
        name,
        email,
        password_hash: hashedPassword,
        private_key,
        public_key,
    });
    res.status(201).send();
});

module.exports = router;