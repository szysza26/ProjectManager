import { useState } from "react";
import { IconButton, Typography, TextField, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createProject } from "../api/projects";
import ModalCircularProgress from "./ModalCircularProgress";

const NewProject = ({goToProjectListPage, goToProjectDetailedPage}) => {

    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [isCreatingProject, setIsCreatingProject] = useState(false);
    const [isError, setIsError] = useState(false);

    const onCliclCreateProject = () => {
        setIsCreatingProject(true);
        setIsError(false);
        createProject(projectName, projectDescription)
            .then(res => goToProjectDetailedPage(res.id))
            .catch(err => setIsError(true))
            .finally(() => setIsCreatingProject(false));
    }

    return (
        <>
            <IconButton sx={{mt: 3}} onClick={() => goToProjectListPage()}>
                <ArrowBackIcon/>
                <Typography>Project list</Typography>
            </IconButton>
            <Typography variant="h3" sx={{mt: 3}}>New project:</Typography>
            <ModalCircularProgress
                isOpen={isCreatingProject}
            />
            {isError && <Typography sx={{mt: 3, color: 'red'}}>Cannot create a new project</Typography>}
            <TextField
                label="Name"
                fullWidth
                sx={{mt: 3}}
                required
                error={!projectName}
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
            />
            <TextField
                label="Description"
                fullWidth
                sx={{mt: 3}}
                value={projectDescription}
                onChange={e => setProjectDescription(e.target.value)}
            />
            <Button
                variant="contained"
                fullWidth
                sx={{mt: 3}}
                disabled={!projectName}
                onClick={onCliclCreateProject}
            >
                Create project
            </Button>
        </>
    )
}

export default NewProject;