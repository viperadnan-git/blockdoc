const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const db = require('../../database');
const loginRequired = require('./middlewares/login.required');
const contract = require('../../contract');
const fileHasher = require('../../lib/fileHasher')

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
    const { doc_type, doc_id, owner } = req.body;
    const { id: user_id } = req.user;
    const docHash = await fileHasher.hash(file.path);
    await db.Document.create({
        contentHash: docHash,
        user_id,
        path: file.path,
    });
    await contract.storeDocument(doc_id, doc_type, docHash, req.user.address, (owner || req.user.address));
    res.status(201).send();
});

router.get('/list', async (req, res) => {
    const docs = await contract.fetchMyIds(req.user.private_key);
    const documents = [];
    for (let i = 0; i < docs.length; i++) {
        const doc = await contract.fetchDocumentById(docs[i], req.user.private_key);
        const { docId, docType, contentHash, owner, creator } = doc;
        documents.push({
            docId,
            docType,
            contentHash,
            owner,
            creator,
        });
    };
    res.send(documents);
});

router.get('/file/:hash', async (req, res) => {
    const { hash } = req.params;
    // return the physical file
    const document = await db.Document.findOne({ where: { contentHash: hash, user_id: req.user.id } });
    if (!document) {
        return res.status(404).send({ code: 404, message: 'Document not found' });
    }

    res.sendFile(document.path);
});

module.exports = router;