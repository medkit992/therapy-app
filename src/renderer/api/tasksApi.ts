import axios from 'axios';

export interface Task {
    id: string;
    title: string;
    dueDate: string;
    completed: boolean;
}

export const fetchTasks = async (): Promise<Task[]> => {
    const response = await axios.get('http://localhost:4000/api/tasks');
    return response.data;
};
