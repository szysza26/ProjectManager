import API from "./api";

export const getProjects = async () => {
    return await API.get(`/projects`)
        .then(res => res.data)
        .catch(err => console.err(err));
}

export const getProject = async (projectId) => {
    return await API.get(`/projects/${projectId}`)
        .then(res => res.data)
        .catch(err => console.err(err));
}

export const createProject = async (projectName, projectDetailed) => {
    const data = {
        name: projectName,
        description: projectDetailed
    };

    return await API.post(`/projects`, data)
        .then(res => res.data)
        .catch(err => console.err(err));
}

export const deleteProject = async (projectId) => {
    return await API.delete(`/projects/${projectId}`)
        .catch(err => console.err(err));
}
