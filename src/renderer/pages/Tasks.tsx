import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard';

interface Task {
    id: string;
    title: string;
    done: boolean;
}

const Tasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        axios.get('/api/tasks').then(res => setTasks(res.data));
    }, []);

    const addTask = async () => {
        if (!title.trim()) return;

        const newTask: Task = {
            id: Date.now().toString(),
            title,
            done: false
        };

        const res = await axios.post('/api/tasks', newTask);
        setTasks(prev => [...prev, res.data]);
        setTitle('');
    };

    const toggleTask = async (id: string) => {
        const res = await axios.patch(`/api/tasks/${id}`);
        setTasks(prev => prev.map(task => (task.id === id ? res.data : task)));
    };

    return (
        <div className="max-w-xl mx-auto p-6 space-y-6">
            <div className="bg-white p-4 rounded-xl shadow border space-y-4">
                <h2 className="text-xl font-bold">New Task</h2>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="Task title"
                    className="w-full border px-3 py-2 rounded"
                />
                <button
                    onClick={addTask}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Add Task
                </button>
            </div>

            <div className="space-y-4">
                {tasks.map(task => (
                    <TaskCard key={task.id} task={task} onToggle={toggleTask} />
                ))}
            </div>
        </div>
    );
};

export default Tasks;
