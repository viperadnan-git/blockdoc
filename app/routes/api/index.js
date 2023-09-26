
const express = require('express');
const router = express.Router();
const multer = require('multer');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(multer().any());

router.use(require('./login'));
router.use('/doc', require('./document'));

module.exports = router;