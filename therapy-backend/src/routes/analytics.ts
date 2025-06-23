import express, { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Client } from '../entity/Client';
import { Session } from '../entity/Session';
import { Invoice } from '../entity/Invoice';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    const clientRepo = AppDataSource.getRepository(Client);
    const sessionRepo = AppDataSource.getRepository(Session);
    const invoiceRepo = AppDataSource.getRepository(Invoice);

    const totalClients = await clientRepo.count();
    const totalSessions = await sessionRepo.count();
    const allInvoices = await invoiceRepo.find();
    const revenue = allInvoices.reduce((sum, inv) => sum + (inv.amount ?? 0), 0);

    // If Session has a durationMinutes field; otherwise default 60
    const sessions = await sessionRepo.find();
    const totalMinutes = sessions.reduce((sum, s) =>
        sum + (typeof (s as any).durationMinutes === 'number'
            ? (s as any).durationMinutes
            : 60
        ), 0);
    const averageSessionLengthMinutes = sessions.length
        ? Math.round(totalMinutes / sessions.length)
        : 0;

    res.json({ totalClients, totalSessions, revenue, averageSessionLengthMinutes });
});

export default router;
