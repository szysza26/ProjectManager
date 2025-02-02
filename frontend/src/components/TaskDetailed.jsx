import { useEffect, useState } from "react";
import { deleteTask, getTask } from "../api/tasks";
import { Typography, IconButton, Button, Alert } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ConfirmDialog from "./ConfirmDialog";
import ModalCircularProgress from "./ModalCircularProgress";

const TaskDetailed = ({projectId, taskId, goToProjectDetailedPage}) => {
    const [task, setTask] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [isError, setIsError] = useState(false);

    const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
    const [isDeletingTask, setIsDeleteingTask] = useState(false);
    const [isErrorDeleteTask, setIsErrorDeleteTask] = useState(false);

    useEffect(() => {
        if (taskId === null || taskId === undefined)
            return;

        setTask(null);
        setIsError(false);
        setIsFetching(true);

        getTask(taskId)
            .then(res => setTask(res))
            .catch(() => setIsError(true))
            .finally(() => setIsFetching(false));
    }, [taskId])

    const onConfirmDeleteTask = () => {
        setIsOpenDeleteDialog(false);
        setIsDeleteingTask(true);
        setIsErrorDeleteTask(false);
        deleteTask(taskId)
            .then(res => goToProjectDetailedPage(projectId))
            .catch(err => setIsErrorDeleteTask(true))
            .finally(() => setIsDeleteingTask(false));
    }
    
    return (
        <>
            <IconButton sx={{mt: 3}} onClick={() => goToProjectDetailedPage(projectId)}>
                <ArrowBackIcon/>
                <Typography>Project details</Typography>
            </IconButton>
            <Typography variant="h3" sx={{mt: 3}}>Task details:</Typography>
            {isFetching && <Typography>Loading task...</Typography>}
            {isError && <Typography>Failed to download task.</Typography>}
            {task !== null && <>
                <Typography>Task name: {task.name}</Typography>
                <Typography>Task created at: {task.createdAt}</Typography>
                <Typography>Task description: {task.description}</Typography>
            </>}
            <Button
                onClick={() => setIsOpenDeleteDialog(true)}
                sx={{mt: 3}}
                color="error"
                disabled={isDeletingTask}
            >
                Delete task
            </Button>
            <ConfirmDialog
                isOpen={isOpenDeleteDialog}
                handleYes={onConfirmDeleteTask}
                handleCancel={() => setIsOpenDeleteDialog(false)}
                title="Delete task"
                content="Are you sure to delete this task?"
            />
            <ModalCircularProgress
                isOpen={isDeletingTask}
            />
            {isErrorDeleteTask && <Alert severity="error">Failed to delete task.</Alert>}
        </>
    )
}

export default TaskDetailed;