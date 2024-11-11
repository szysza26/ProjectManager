export const getProjects = async () => {
    await new Promise(r => setTimeout(r, 2000)); // symulate request to api
    return [
        {id: 1, name: "Project 1", createdAt: "2024-10-29 18:00"},
        {id: 2, name: "Project 2", createdAt: "2024-10-30 18:00"},
        {id: 3, name: "Project 3", createdAt: "2024-10-31 18:00"},
    ];
}

export const getProject = async (projectId) => {
    await new Promise(r => setTimeout(r, 2000)); // symulate request to api
    return {
        id: projectId,
        name: "Project " + projectId,
        createdAt: "2024-10-31 18:00",
        description: "Project description " + projectId
    };
}
