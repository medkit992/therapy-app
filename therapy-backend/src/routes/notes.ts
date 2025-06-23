import express, { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Note, NoteType } from '../entity/Note';
import { Client } from '../entity/Client';
import { Session } from '../entity/Session';

const router = express.Router();

// List notes
router.get('/', async (_req, res) => {
    const notes = await AppDataSource.getRepository(Note).find({
        relations: ['client', 'session'],
        order: { createdAt: 'DESC' },
    });
    res.json(notes);
});

// Get one
router.get('/:id', async (req: Request<{ id: string }>, res) => {
    const id = Number(req.params.id);
    const note = await AppDataSource.getRepository(Note).findOne({
        where: { id },
        relations: ['client', 'session'],
    });
    if (!note) {
        res.sendStatus(404);
        return
    }
    res.json(note);
});

// Create
router.post('/', async (req, res) => {
    const repo = AppDataSource.getRepository(Note);
    const note = repo.create(req.body);
    const saved = await repo.save(note);
    res.status(201).json(saved);
});

// Update
router.put('/:id', async (req: Request<{ id: string }>, res) => {
    const id = Number(req.params.id);
    const repo = AppDataSource.getRepository(Note);
    await repo.update(id, req.body);
    const updated = await repo.findOneBy({ id });
    if (!updated) {
        res.sendStatus(404);
        res.json(updated);
        return
    }
});

// Delete
router.delete('/:id', async (req: Request<{ id: string }>, res) => {
    const id = Number(req.params.id);
    await AppDataSource.getRepository(Note).delete(id);
    res.sendStatus(204);
});

// Helper: fetch clients for dropdown
router.get('/helpers/clients', async (_req, res) => {
    const clients = await AppDataSource.getRepository(Client).find();
    res.json(clients);
});

// Helper: fetch upcoming sessions
router.get('/helpers/sessions/upcoming', async (_req, res) => {
    const sessions = await AppDataSource.getRepository(Session)
        .createQueryBuilder('s')
        .where('s.date >= CURRENT_DATE')
        .orderBy('s.date', 'ASC')
        .getMany();
    res.json(sessions);
});

router.get('/helpers/sessions/history', async (_req, res) => {
    const sessions = await AppDataSource.getRepository(Session)
        .createQueryBuilder('s')
        .where('s.date < CURRENT_DATE')
        .orderBy('s.date', 'DESC')
        .getMany();
    res.json(sessions);
});

export default router;
