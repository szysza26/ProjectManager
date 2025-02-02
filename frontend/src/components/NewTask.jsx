import { useState } from "react";
import { IconButton, Typography, TextField, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createTask } from "../api/tasks";
import ModalCircularProgress from "./ModalCircularProgress";

const NewTask = ({projectId, goToProjectDetailedPage, goToTaskDetailedPage}) => {

    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [isCreatingTask, setIsCreatingTask] = useState(false);
    const [isError, setIsError] = useState(false);

    const onCliclCreateTask = () => {
        setIsCreatingTask(true);
        setIsError(false);
        createTask(projectId, taskName, taskDescription)
            .then(res => goToTaskDetailedPage(res.projectId, res.id))
            .catch(err => setIsError(true))
            .finally(() => setIsCreatingTask(false));
    }

    return (
        <>
            <IconButton sx={{mt: 3}} onClick={() => goToProjectDetailedPage(projectId)}>
                <ArrowBackIcon/>
                <Typography>Project details</Typography>
            </IconButton>
            <Typography variant="h3" sx={{mt: 3}}>New task:</Typography>
            <ModalCircularProgress
                isOpen={isCreatingTask}
            />
            {isError && <Typography sx={{mt: 3, color: 'red'}}>Cannot create a new task</Typography>}
            <TextField
                label="Name"
                fullWidth
                sx={{mt: 3}}
                required
                error={!taskName}
                value={taskName}
                onChange={e => setTaskName(e.target.value)}
            />
            <TextField
                label="Description"
                fullWidth
                sx={{mt: 3}}
                value={taskDescription}
                onChange={e => setTaskDescription(e.target.value)}
            />
            <Button
                variant="contained"
                fullWidth
                sx={{mt: 3}}
                disabled={!taskName}
                onClick={onCliclCreateTask}
            >
                Create task
            </Button>
        </>
    )
}

export default NewTask;