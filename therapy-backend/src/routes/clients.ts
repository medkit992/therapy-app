// therapy-backend/src/routes/clients.ts
import express, { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Client } from '../entity/Client';

const router = express.Router();

// GET /api/clients
router.get('/', async (req: Request, res: Response) => {
    const clients = await AppDataSource.getRepository(Client).find();
    res.json(clients);
});

// GET /api/clients/:id
router.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
    const id = Number(req.params.id);
    const client = await AppDataSource.getRepository(Client).findOneBy({ id });
    if (!client) {
        res.sendStatus(404);
        return;
    }
    res.json(client);
});

// POST /api/clients
router.post('/', async (req: Request, res: Response) => {
    const repo = AppDataSource.getRepository(Client);
    const newClient = repo.create(req.body);
    const saved = await repo.save(newClient);
    res.status(201).json(saved);
});

// PUT /api/clients/:id
router.put('/:id', async (req: Request<{ id: string }>, res: Response) => {
    const id = Number(req.params.id);
    const repo = AppDataSource.getRepository(Client);
    await repo.update(id, req.body);
    const updated = await repo.findOneBy({ id });
    if (!updated) {
        res.sendStatus(404);
        return;
    }
    res.json(updated);
});

// DELETE /api/clients/:id
router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
    const id = Number(req.params.id);
    await AppDataSource.getRepository(Client).delete(id);
    res.sendStatus(204);
});

export default router;
