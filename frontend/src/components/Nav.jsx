import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useContext, useMemo, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { AccountCircle } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";

const Nav = ({goToProjectListPage}) => {
    const { logout, token } = useContext(AuthContext);

    const [anchorEl, setAnchorEl] = useState(null);

    const user = useMemo(() => {
        if(!token)
            return '';

        const decodedJwt = jwtDecode(token);
        return decodedJwt.name;
    }, [token])

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                        textDecoration: 'none',
                        flexGrow: 1
                    }}
                >
                    ProjectManager
                </Typography>
                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem disabled divider>{user}</MenuItem>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Nav;