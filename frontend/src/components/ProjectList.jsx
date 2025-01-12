import { useEffect, useState } from "react";
import { getProjects } from "../api/projects";
import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography, Button } from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const ProjectList = ({goToProjectDetailedPage, goToNewProjectPage}) => {
    const [projects, setProjects] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        getProjects()
            .then(res => setProjects(res))
            .catch(() => setIsError(true))
            .finally(() => setIsFetching(false));
    }, [])

    return (
        <>
            <Typography variant="h3" sx={{mt: 3}}>Project list:</Typography>
            {isFetching && <Typography>Loading projects...</Typography>}
            {isError && <Typography>Failed to download projects.</Typography>}
            {projects.length > 0 && <List>
                {projects.map(project =>
                    <ListItem key={project.id}>
                        <ListItemButton onClick={() => goToProjectDetailedPage(project.id)}>
                            <ListItemAvatar>
                                <Avatar>
                                    <FormatListBulletedIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={project.name} secondary={project.createdAt}/>
                        </ListItemButton>
                    </ListItem>
                )}
            </List>}
            <Button onClick={goToNewProjectPage} >New project</Button>
        </>
    )
}

export default ProjectList;