import { useEffect, useState } from "react";
import { getTask } from "../api/tasks";
import { Typography, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TaskDetailed = ({projectId, taskId, goToProjectDetailedPage}) => {
    const [task, setTask] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [isError, setIsError] = useState(false);

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
        </>
    )
}

export default TaskDetailed;