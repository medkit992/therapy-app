// therapy-backend/src/routes/recording.ts
import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { AppDataSource } from '../data-source';
import { Note } from '../entity/Note';

const router = express.Router();

// configure multer to write into /uploads
const upload = multer({ dest: path.join(__dirname, '../../uploads') });

router.post(
    '/:id/recording',
    upload.single('audio'),
    async (req: Request<{ id: string }>, res: Response) => {
        // parse and validate note ID
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            res.status(400).json({ error: 'Invalid note ID' });
            return;
        }

        // get the Note repository
        const repo = AppDataSource.getRepository(Note);

        // make sure a file was actually uploaded
        if (!req.file) {
            res.status(400).json({ error: 'No audio file provided' });
            return;
        }

        // fetch the note record
        const note = await repo.findOneBy({ id });
        if (!note) {
            res.sendStatus(404);
            return;
        }

        // update the note with the file URL and a stub summary
        note.audioUrl = `/uploads/${req.file.filename}`;
        note.summary = `This is a placeholder AI summary for note #${id}.`;
        await repo.save(note);

        // return the updated note
        res.json(note);
    }
);

export default router;
