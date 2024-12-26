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
