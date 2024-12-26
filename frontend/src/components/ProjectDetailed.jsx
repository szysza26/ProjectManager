import { useEffect, useState } from "react";
import { getProject } from "../api/projects";
import { getTasksForProject } from "../api/tasks";
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import TaskIcon from '@mui/icons-material/Task';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProjectDetailed = ({projectId, goToProjectListPage, goToTaskDetailedPage}) => {
    const [project, setProject] = useState(null);
    const [isFetchingProject, setIsFetchingProject] = useState(true);
    const [isErrorProject, setIsErrorProject] = useState(false);

    const [tasks, setTasks] = useState([]);
    const [isFetchingTasks, setIsFetchingTasks] = useState(true);
    const [isErrorTasks, setIsErrorTasks] = useState(false);

    useEffect(() => {
        if (projectId === null || projectId === undefined)
            return;

        setProject(null);
        setIsErrorProject(false);
        setIsFetchingProject(true);

        getProject(projectId)
            .then(res => setProject(res))
            .catch(() => setIsErrorProject(true))
            .finally(() => setIsFetchingProject(false));
        
        setTasks([]);
        setIsErrorTasks(false);
        setIsFetchingTasks(true);

        getTasksForProject(projectId)
            .then(res => setTasks(res))
            .catch(() => setIsErrorTasks(true))
            .finally(() => setIsFetchingTasks(false));
    }, [projectId])

    return (
        <>
            <IconButton sx={{mt: 3}} onClick={() => goToProjectListPage()}>
                <ArrowBackIcon/>
                <Typography>Project list</Typography>
            </IconButton>
            <Typography variant="h3" sx={{mt: 3}}>Project details:</Typography>
            {isFetchingProject && <Typography>Loading project...</Typography>}
            {isErrorProject && <Typography>Failed to download project.</Typography>}
            {project !== null && <>
                <Typography>Project name: {project.name}</Typography>
                <Typography>Project created at: {project.createdAt}</Typography>
                <Typography>Project description: {project.description}</Typography>
            </>}
            <Typography variant="h3" sx={{mt: 3}}>Task list:</Typography>
            {isFetchingTasks && <Typography>Loading tasks...</Typography>}
            {isErrorTasks && <Typography>Failed to download tasks.</Typography>}
            {tasks.length > 0 && <List>
                {tasks.map(task =>
                    <ListItem key={task.id}>
                        <ListItemButton onClick={() => goToTaskDetailedPage(projectId, task.id)}>
                            <ListItemAvatar>
                                <Avatar>
                                    <TaskIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={task.name} secondary={task.createdAt}/>
                        </ListItemButton>
                    </ListItem>
                )}
            </List>}
        </>
    )
}

export default ProjectDetailed;