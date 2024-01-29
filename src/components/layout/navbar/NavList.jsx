import { Box, List, ListItem, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../firebaseConfig";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

function NavList({ setListOpen }) {
    const { logoutContext, user } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        logoutContext();
        navigate("/");
        setListOpen(false);
    };

    const rolAdmin = import.meta.env.VITE_ROL_ADMIN;

    return (
        <Box sx={{}}>
            <nav>
                {user && user.email && user.rol !== rolAdmin ? (
                    <List >
                        <ListItem onClick={() => setListOpen(false)}>
                            <Link component={Link} to={"/favorites"} >
                                <Typography variant="drawer">Favoritos</Typography>
                            </Link>
                        </ListItem>
                        <ListItem >
                            <Link onClick={handleLogout}>
                                <Typography variant="drawer">Cerrar sesión</Typography>
                            </Link>
                        </ListItem>
                    </List>
                ) : user && user.rol === rolAdmin ? (
                    <>
                        <List>
                                <ListItem onClick={() => setListOpen(false)}>
                                <Link component={Link} to={"/dashboard"}>
                                    <Typography variant="drawer">Dashboard</Typography>
                                </Link>
                            </ListItem>
                                <ListItem onClick={() => setListOpen(false)}>
                                <Link component={Link} to={"/favorites"}>
                                    <Typography variant="drawer">Favoritos</Typography>
                                </Link>
                            </ListItem>
                            <ListItem >
                                <Link onClick={handleLogout}>
                                    <Typography variant="drawer">Cerrar sesión</Typography>
                                </Link>
                            </ListItem>
                        </List>
                    </>
                ) : (
                            <Link component={Link} to={"/Login"} onClick={() => setListOpen(false)}>
                        <Typography variant="drawer">Iniciar sesión</Typography>
                    </Link>
                )}
            </nav>
        </Box>

    );

}

export default NavList;