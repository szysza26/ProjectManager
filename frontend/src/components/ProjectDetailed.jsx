import { useEffect, useState } from "react";
import { deleteProject, getProject } from "../api/projects";
import { getTasksForProject } from "../api/tasks";
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography, Box, Modal, Button, CircularProgress, Alert } from "@mui/material";
import TaskIcon from '@mui/icons-material/Task';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ConfirmDialog from "./ConfirmDialog";
import ModalCircularProgress from "./ModalCircularProgress";

const ProjectDetailed = ({projectId, goToProjectListPage, goToTaskDetailedPage}) => {
    const [project, setProject] = useState(null);
    const [isFetchingProject, setIsFetchingProject] = useState(true);
    const [isErrorProject, setIsErrorProject] = useState(false);

    const [tasks, setTasks] = useState([]);
    const [isFetchingTasks, setIsFetchingTasks] = useState(true);
    const [isErrorTasks, setIsErrorTasks] = useState(false);

    const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
    const [isDeletingProject, setIsDeleteingProject] = useState(false);
    const [isErrorDeleteProject, setIsErrorDeleteProject] = useState(false);

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

    const onConfirmDeleteProject = () => {
        setIsOpenDeleteDialog(false);
        setIsDeleteingProject(true);
        setIsErrorDeleteProject(false);
        deleteProject(projectId)
            .then(res => goToProjectListPage())
            .catch(err => setIsErrorDeleteProject(true))
            .finally(() => setIsDeleteingProject(false));
    }

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
            <Button
                onClick={() => setIsOpenDeleteDialog(true)}
                sx={{mt: 3}}
                color="error"
                disabled={isDeletingProject}
            >
                Delete project
            </Button>
            <ConfirmDialog
                isOpen={isOpenDeleteDialog}
                handleYes={onConfirmDeleteProject}
                handleCancel={() => setIsOpenDeleteDialog(false)}
                title="Delete project"
                content="Are you sure to delete this project?"
            />
            <ModalCircularProgress
                isOpen={isDeletingProject}
            />
            {isErrorDeleteProject && <Alert severity="error">Failed to delete project.</Alert>}
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