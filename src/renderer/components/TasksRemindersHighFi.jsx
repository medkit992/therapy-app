// src/components/TasksRemindersHighFi.jsx
import React from 'react';
import { Search, Plus, CheckSquare, Clock } from 'lucide-react';

// UI primitives
const Card = ({ children, className = '' }) => (
  <div className={`${className} bg-white rounded-lg shadow p-4`}>{children}</div>
);
const Button = ({ children, className = '', variant, ...props }) => (
  <button
    className={`${className} px-4 py-2 rounded ${
      variant === 'outline' ? 'border border-gray-300' : 'bg-teal-600 text-white'
    } hover:shadow transition`}
    {...props}
  >
    {children}
  </button>
);
const Input = (props) => (
  <input
    className="pl-10 pr-4 py-2 w-80 rounded border border-gray-300 focus:ring-2 focus:ring-teal-200"
    {...props}
  />
);

// Sample tasks
const tasks = [
  { id: 1, title: 'Follow up with Client A', due: 'Jul 11, 10:00 AM', overdue: false },
  { id: 2, title: 'Send intake forms', due: 'Jul 12, 2:00 PM', overdue: false },
  { id: 3, title: 'Review assessment', due: 'Jul 10, 9:00 AM', overdue: true },
];

export default function TasksRemindersHighFi() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-8">
        <h2 className="text-2xl font-bold text-teal-600 mb-8">TherapyApp</h2>
        <nav className="space-y-4">
          <Button variant="outline" className="w-full text-left text-gray-700 hover:bg-teal-100 hover:text-teal-600">
            Dashboard
          </Button>
          <Button variant="outline" className="w-full text-left text-gray-700 hover:bg-teal-100 hover:text-teal-600">
            Tasks & Reminders
          </Button>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Tasks & Reminders</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input placeholder="Search tasks..." />
            </div>
            <Button className="flex items-center space-x-2">
              <Plus size={18} /> <span>New Task</span>
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 overflow-auto">
          {tasks.map(task => (
            <Card
              key={task.id}
              className={`flex items-center justify-between p-4 hover:shadow transition ${
                task.overdue ? 'border-l-4 border-red-500' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <CheckSquare
                  size={20}
                  className={task.overdue ? 'text-red-500' : 'text-teal-600'}
                />
                <div>
                  <div className={`${task.overdue ? 'text-red-600' : 'text-gray-800'} text-lg`}>
                    {task.title}
                  </div>
                  <div className="text-sm text-gray-500 mt-1 flex items-center space-x-1">
                    <Clock size={14} /> <span>{task.due}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="text-gray-400 hover:text-teal-600">
                Complete
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
