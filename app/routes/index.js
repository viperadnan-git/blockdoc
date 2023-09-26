const router = require('express').Router();

router.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

router.use('/api', require('./api'));

module.exports = router;