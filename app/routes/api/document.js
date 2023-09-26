const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const db = require('../../database');
const loginRequired = require('./middlewares/login.required');


router.use(loginRequired);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), './uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});


router.post('/upload', multer({ storage }).single('file'), async (req, res) => {
    const { file } = req;
    const { doc_type, doc_id } = req.body;
    const { id: user_id } = req.user;
    await db.Document.create({
        doc_id,
        doc_type,
        user_id,
        path: file.path,
    });
    res.status(201);
});

router.get('/list', async (req, res) => {
    const { id: user_id } = req.user;
    const documents = await db.Document.findAll({ where: { user_id } });
    res.send(documents);
});

module.exports = router;