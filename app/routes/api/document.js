const router = require('express').Router();
const multer = require('multer');
const path = require('path');

const db = require('../../database');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

router.post('/upload', multer({ storage }).single('file'), async (req, res) => {
    const { file } = req;
    const { title, description } = req.body;
    const { id: user_id } = req.user;
    const document = await db.Document.create({
        title,
        description,
        file_path: file.path,
        user_id,
    });
    res.send(document);
});