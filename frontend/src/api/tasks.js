import axios from "axios";

export const getTasksForProject = async (projectId) => {
    return await axios.get(`${import.meta.env.VITE_URL}/tasks/project/${projectId}`)
        .then(res => res.data)
        .catch(err => console.err(err));
}

export const getTask = async (taskId) => {
    return await axios.get(`${import.meta.env.VITE_URL}/tasks/${taskId}`)
        .then(res => res.data)
        .catch(err => console.err(err));
}

export const createTask = async (projectId, taskName, taskDetailed) => {
    const data = {
        name: taskName,
        description: taskDetailed
    };

    return await axios.post(`${import.meta.env.VITE_URL}/tasks/project/${projectId}`, data)
        .then(res => res.data)
        .catch(err => console.err(err));
}

export const deleteTask = async (taskId) => {
    return await axios.delete(`${import.meta.env.VITE_URL}/tasks/${taskId}`)
        .catch(err => console.err(err));
}