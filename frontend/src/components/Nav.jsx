import { AppBar, Toolbar, Typography } from "@mui/material";

const Nav = ({goToProjectListPage}) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    component="a"
                    href="#main"
                    onClick={goToProjectListPage}
                    sx={{
                        color: 'inherit',
                        textDecoration: 'none'
                    }}
                >
                    ProjectManager
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Nav;