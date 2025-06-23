// therapy-backend/src/routes/dashboard.ts
import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { Client }  from '../entity/Client';
import { Note }    from '../entity/Note';
import { Session } from '../entity/Session';
import { File }    from '../entity/File';     // adjust to your entity name
import { Task }    from '../entity/Task';     // adjust to your entity name

const router = Router();

router.get('/', async (_req, res) => {
  const [clientCount, noteCount, sessionCount, fileCount, taskCount] = await Promise.all([
    AppDataSource.getRepository(Client).count(),
    AppDataSource.getRepository(Note).count(),
    AppDataSource.getRepository(Session).count(),
    AppDataSource.getRepository(File).count(),
    AppDataSource.getRepository(Task).count(),
  ]);
  res.json({ clientCount, noteCount, sessionCount, fileCount, taskCount });
});

export default router;
