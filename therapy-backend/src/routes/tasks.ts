import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';

const router = express.Router();
const filePath = path.join(__dirname, '../data/tasks.json');

// GET all tasks
router.get('/', (_req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading tasks:', err);
            return res.status(500).json({ message: 'Failed to load tasks' });
        }
        res.json(JSON.parse(data));
    });
});

// POST new task
router.post('/', (req, res) => {
    const newTask = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Failed to read task list' });

        const tasks = JSON.parse(data);
        tasks.push(newTask);

        fs.writeFile(filePath, JSON.stringify(tasks, null, 2), err => {
            if (err) return res.status(500).json({ message: 'Failed to save task' });
            res.json(newTask);
        });
    });
});

// PATCH toggle completion
router.patch('/:id', (req, res) => {
    const taskId = req.params.id;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ message: 'Failed to read task list' });

        const tasks = JSON.parse(data);
        const task = tasks.find((t: any) => t.id === taskId);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        task.done = !task.done;

        fs.writeFile(filePath, JSON.stringify(tasks, null, 2), err => {
            if (err) return res.status(500).json({ message: 'Failed to update task' });
            res.json(task);
        });
    });
});

export = router;
