// therapy-backend/src/routes/sessions.ts
import { Router, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Session } from '../entity/Session';

// ↓ cast away all overload checks:
const router: any = Router();
const repo = () => AppDataSource.getRepository(Session);
// Helper to get today in YYYY-MM-DD
function today(): string {
    return new Date().toISOString().split('T')[0];
}

// Upcoming sessions (date >= today)
async function getUpcomingSessions(_req: Request, res: Response) {
    try {
        const sessions = await repo().find({
            where: { date: today() },
            relations: ['client'],
            order: { time: 'ASC' },
        });
        return res.json(sessions);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Unable to fetch upcoming sessions' });
    }
}
router.get('/upcoming', getUpcomingSessions);

// Past sessions (date < today)
async function getPastSessions(_req: Request, res: Response) {
    try {
        const sessions = await repo()
            .createQueryBuilder('s')
            .leftJoinAndSelect('s.client', 'client')
            .where('s.date < :d', { d: today() })
            .orderBy('s.date', 'DESC')
            .addOrderBy('s.time', 'DESC')
            .getMany();
        return res.json(sessions);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Unable to fetch past sessions' });
    }
}
router.get('/history', getPastSessions);

// Get one session
async function getSessionById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const session = await repo().findOne({
        where: { id },
        relations: ['client'],
    });
    if (!session) return res.sendStatus(404);
    return res.json(session);
}
router.get('/:id', getSessionById);

// Create session
async function createSession(req: Request, res: Response) {
    try {
        const s = repo().create(req.body as Partial<Session>);
        if ((req.body as any).isTelehealth) {
            const { v4 } = await import('uuid');
            s.telehealthId = v4();
            s.telehealthUrl = `https://yourapp.com/telehealth/${s.telehealthId}`;
        }
        const saved = await repo().save(s);
        return res.status(201).json(saved);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'Error creating session' });
    }
}
router.post('/', createSession);

// Update session
async function updateSession(req: Request, res: Response) {
    const id = Number(req.params.id);
    let s = await repo().findOneBy({ id });
    if (!s) return res.sendStatus(404);
    repo().merge(s, req.body as Partial<Session>);
    if ((req.body as any).isTelehealth && !s.telehealthId) {
        const { v4 } = await import('uuid');
        s.telehealthId = v4();
        s.telehealthUrl = `https://yourapp.com/telehealth/${s.telehealthId}`;
    }
    const updated = await repo().save(s);
    return res.json(updated);
}
router.put('/:id', updateSession);

// Delete session
async function deleteSession(req: Request, res: Response) {
    const id = Number(req.params.id);
    await repo().delete(id);
    return res.sendStatus(204);
}
router.delete('/:id', deleteSession);

export default router;