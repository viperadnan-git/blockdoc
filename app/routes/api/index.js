
const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use(require('./login'));
router.use('/doc', require('./document'));

module.exports = router;