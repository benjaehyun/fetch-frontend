import { Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "../auth/AuthProvider";

const Layout = () => {
    const { logout } = useAuth()

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow:1}} >
                        Fetch Frontend
                    </Typography>
                    <Button color="inherit" onClick={logout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <main>
                <Outlet />
            </main>
        </>
    )
}; 

export default Layout; 