import axios from "axios";

export const getProjects = async () => {
    return await axios.get(`${import.meta.env.VITE_URL}/projects`)
        .then(res => res.data)
        .catch(err => console.err(err));
}

export const getProject = async (projectId) => {
    return await axios.get(`${import.meta.env.VITE_URL}/projects/${projectId}`)
        .then(res => res.data)
        .catch(err => console.err(err));
}

export const createProject = async (projectName, projectDetailed) => {
    const data = {
        name: projectName,
        description: projectDetailed
    };

    return await axios.post(`${import.meta.env.VITE_URL}/projects`, data)
        .then(res => res.data)
        .catch(err => console.err(err));
}

export const deleteProject = async (projectId) => {
    return await axios.delete(`${import.meta.env.VITE_URL}/projects/${projectId}`)
        .catch(err => console.err(err));
}