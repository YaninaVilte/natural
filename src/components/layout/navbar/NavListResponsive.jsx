import { Box, List, ListItem, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../firebaseConfig";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { menuItemsAdmin } from "../../../router/navigationAdmin";

function NavListResponsive({setDrawerOpen}) {
    const { logoutContext, user } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        logoutContext();
        navigate("/");
        setDrawerOpen(false);
    };

    const rolAdmin = import.meta.env.VITE_ROL_ADMIN;

    return (
        <Box sx={{}}>
            <nav>
                {menuItemsAdmin.map(({ id, path, title }) => (
                    <ListItem key={id}>
                        <Link component={Link} to={path} onClick={() => setDrawerOpen(false)}>
                            <Typography variant="drawer">{title}</Typography>
                        </Link>
                    </ListItem>
                ))}
                {user && user.email && user.rol !== rolAdmin ? (
                    <List >
                        <ListItem onClick={() => setDrawerOpen(false)}>
                            <Link component={Link} to={"/favorites"}>
                                <Typography variant="drawer">Favoritos</Typography>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link onClick={handleLogout}>
                                <Typography variant="drawer">Cerrar sesión</Typography>
                            </Link>
                        </ListItem>
                    </List>
                ) : user && user.rol === rolAdmin ? (
                    <List>
                            <ListItem onClick={() => setDrawerOpen(false)}>
                            <Link component={Link} to={"/dashboard"}>
                                <Typography variant="drawer">Dashboard</Typography>
                            </Link>
                        </ListItem>
                            <ListItem onClick={() => setDrawerOpen(false)}>
                            <Link component={Link} to={"/favorites"}>
                                <Typography variant="drawer">Favoritos</Typography>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link onClick={handleLogout}>
                                <Typography variant="drawer">Cerrar sesión</Typography>
                            </Link>
                        </ListItem>
                    </List>
                ) : (
                    <List >
                                <ListItem onClick={() => setDrawerOpen(false)}>
                            <Link component={Link} to={"/Login"} >
                                <Typography variant="drawer">Iniciar sesión</Typography>
                            </Link>
                        </ListItem>
                    </List>
                )}
            </nav>
        </Box>

    );

}

export default NavListResponsive;