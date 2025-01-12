import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import { Container, CssBaseline } from '@mui/material';
import Nav from './components/Nav';
import { useState } from 'react';
import ProjectList from './components/ProjectList';
import ProjectDetailed from './components/ProjectDetailed';
import TaskDetailed from './components/TaskDetailed';
import NewProject from './components/NewProject';

function App() {
    const [page, setPage] = useState({
        name: "ProjectList"
    }); // TODO: using react router instead of this

    const goToProjectListPage = () => {
        setPage({name: "ProjectList"});
    }

    const goToProjectDetailedPage = projectId => {
        setPage({
            name: "ProjectDetailed",
            projectId: projectId
        });
    }

    const goToNewProjectPage = () => {
        setPage({name: "NewProject"});
    }

    const goToTaskDetailedPage = (projectId, taskId) => {
        setPage({
            name: "TaskDetailed",
            projectId: projectId,
            taskId: taskId
        })
    }

    const getPage = () => {
        switch (page.name) {
            case "ProjectList":
                return <ProjectList
                    goToProjectDetailedPage={goToProjectDetailedPage}
                    goToNewProjectPage={goToNewProjectPage}
                />;
            case "ProjectDetailed":
                return <ProjectDetailed
                    projectId={page.projectId}
                    goToProjectListPage={goToProjectListPage}
                    goToTaskDetailedPage={goToTaskDetailedPage}
                />
            case "NewProject":
                return <NewProject
                    goToProjectListPage={goToProjectListPage}
                />;
            case "TaskDetailed":
                return <TaskDetailed
                    projectId={page.projectId}
                    taskId={page.taskId}
                    goToProjectDetailedPage={goToProjectDetailedPage}
                />
            default:
                return "Not found";
        }
    }

    return (
        <>
            <CssBaseline/>
            <Nav
                goToProjectListPage={goToProjectListPage}
            />
            <Container fixed>
                {getPage()}
            </Container>
        </>
    )
}

export default App
