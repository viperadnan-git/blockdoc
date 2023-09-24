// create a login and sign up api endpoints and store and fetch data from database

const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../../database');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(404).send({ message: 'Invalid password' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.send({ token });
});

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email } });
    if (user) {
        return res.status(409).send({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.User.create({ email, password: hashedPassword });
    res.status(201).send();
});

module.exports = router;