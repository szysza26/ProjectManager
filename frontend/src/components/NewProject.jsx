import { useState } from "react";
import { IconButton, Typography, TextField, Button, CircularProgress } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createProject } from "../api/projects";

const NewProject = ({goToProjectListPage}) => {

    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const [isError, setIsError] = useState(false);

    const onCliclCreateProject = () => {
        setIsFetching(true);
        setIsError(false);
        createProject(projectName, projectDescription)
            .then(res => goToProjectListPage())
            .catch(err => setIsError(true))
            .finally(() => setIsFetching(false));
    }

    return (
        <>
            <IconButton sx={{mt: 3}} onClick={() => goToProjectListPage()}>
                <ArrowBackIcon/>
                <Typography>Project list</Typography>
            </IconButton>
            <Typography variant="h3" sx={{mt: 3}}>New project:</Typography>
            {isFetching && <CircularProgress />}
            {isError && <Typography sx={{mt: 3, color: 'red'}}>Cannot create a new project</Typography>}
            <TextField
                label="Name"
                fullWidth
                sx={{mt: 3}}
                required
                disabled={isFetching}
                error={!projectName}
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
            />
            <TextField
                label="Description"
                fullWidth
                sx={{mt: 3}}
                disabled={isFetching}
                value={projectDescription}
                onChange={e => setProjectDescription(e.target.value)}
            />
            <Button
                variant="contained"
                fullWidth
                sx={{mt: 3}}
                disabled={isFetching || !projectName}
                onClick={onCliclCreateProject}
            >
                Create project
            </Button>
        </>
    )
}

export default NewProject;