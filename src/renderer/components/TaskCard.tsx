import React from 'react';

interface Task {
  id: string;
  title: string;
  done: boolean;
}

interface Props {
  task: Task;
  onToggle: (id: string) => void;
}

const TaskCard: React.FC<Props> = ({ task, onToggle }) => (
  <div
    className={`flex justify-between items-center p-4 border rounded-lg shadow ${
      task.done ? 'bg-green-50' : 'bg-white'
    }`}
  >
    <span className={task.done ? 'line-through text-gray-400' : ''}>
      {task.title}
    </span>
    <button
      onClick={() => onToggle(task.id)}
      className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
    >
      {task.done ? 'Undo' : 'Done'}
    </button>
  </div>
);

export default TaskCard;
