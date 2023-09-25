
const express = require('express');
const router = express.Router();

router.use(express.json());

router.use(require('./login'));

module.exports = router;