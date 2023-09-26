const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.use('/doc', require('./document'));
router.use(require('./login'));

module.exports = router;