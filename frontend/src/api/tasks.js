export const getTasks = async (projectId) => {
    await new Promise(r => setTimeout(r, 2000)); // symulate request to api
    return [
        {id: 1, name: "Task 1", createdAt: "2024-10-29 18:00"},
        {id: 2, name: "Task 2", createdAt: "2024-10-30 18:00"},
        {id: 3, name: "Task 3", createdAt: "2024-10-31 18:00"},
    ];
}

export const getTask = async (taskId) => {
    await new Promise(r => setTimeout(r, 2000)); // symulate request to api
    return {
        id: taskId,
        name: "Task " + taskId,
        createdAt: "2024-10-31 18:00",
        description: "Task description " + taskId
    };
}
