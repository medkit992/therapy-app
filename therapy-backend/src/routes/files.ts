import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import multer from 'multer';

const router = express.Router();
const filePath = path.join(__dirname, '../data/files.json');
const uploadsDir = path.join(__dirname, '../uploads');

// Create uploads folder if missing
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Multer storage config
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsDir),
    filename: (_req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

// GET /api/files
router.get('/', (_req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading files:', err);
            return res.status(500).json({ message: 'Failed to load files' });
        }
        res.json(JSON.parse(data));
    });
});

// POST /api/files/upload
router.post(
    '/upload',
    upload.single('file'),
    (req: express.Request, res: express.Response): void => {
        const file = req.file;

        if (!file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.status(500).json({ message: 'Failed to read file list' });
                return;
            }

            const files = JSON.parse(data);
            const fileMeta = {
                id: Date.now().toString(),
                name: file.originalname,
                savedAs: file.filename,
                path: `/uploads/${file.filename}`,
                size: file.size
            };

            files.push(fileMeta);

            fs.writeFile(filePath, JSON.stringify(files, null, 2), err => {
                if (err) {
                    res.status(500).json({ message: 'Failed to write file list' });
                } else {
                    res.json(fileMeta);
                }
            });
        });
    }
);


export = router;
