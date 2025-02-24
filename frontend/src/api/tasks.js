import API from "./api";

export const getTasksForProject = async (projectId) => {
    return await API.get(`/tasks/project/${projectId}`)
        .then(res => res.data)
        .catch(err => console.err(err));
}

export const getTask = async (taskId) => {
    return await API.get(`/tasks/${taskId}`)
        .then(res => res.data)
        .catch(err => console.err(err));
}

export const createTask = async (projectId, taskName, taskDetailed) => {
    const data = {
        name: taskName,
        description: taskDetailed
    };

    return await API.post(`/tasks/project/${projectId}`, data)
        .then(res => res.data)
        .catch(err => console.err(err));
}

export const deleteTask = async (taskId) => {
    return await API.delete(`/tasks/${taskId}`)
        .catch(err => console.err(err));
}
