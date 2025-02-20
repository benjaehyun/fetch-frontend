import { Outlet, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Badge } from "@mui/material";
import { Favorite as FavoriteIcon } from '@mui/icons-material';
import { useAuth } from "../auth/AuthProvider";

const Layout = () => {
    const { logout, favorites } = useAuth()

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography 
                    variant="h6" 
                    component={Link} 
                    to="/"
                    sx={{ 
                        flexGrow: 1,
                        textDecoration: 'none',
                        color: 'inherit'
                    }}
                    >
                        Fetch Frontend
                    </Typography>

                    <Button 
                    component={Link}
                    to="/favorites"
                    color="inherit"
                    startIcon={
                        <Badge 
                            badgeContent={favorites.size} 
                            color="secondary"
                        >
                            <FavoriteIcon />
                        </Badge>
                    }
                    sx={{ mr: 2 }}
                    >
                        Favorites
                    </Button>

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