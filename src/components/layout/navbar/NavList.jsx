import { Box, List, ListItem, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../firebaseConfig";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

function NavList() {
    const { logoutContext, user } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        logoutContext();
        navigate("/");
    };

    const rolAdmin = import.meta.env.VITE_ROL_ADMIN;


    return (
        <Box sx={{ width: "15rem", marginTop: "3rem", height: "11rem" }}>
            <nav>
                    {user && user.email && user.rol !== rolAdmin ? (
                    <List>
                            <ListItem>
                                <Link component={Link} to={""} sx={{}}>
                                    <Typography variant="drawer">Mis Pedidos</Typography>
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link component={Link} to={""} sx={{}}>
                                    <Typography variant="drawer">Favoritos</Typography>
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link onClick={handleLogout} sx={{}}>
                                    <Typography variant="drawer">Cerrar sesión</Typography>
                                </Link>
                            </ListItem>
                        </List>
                    ) : user && user.rol === rolAdmin ? (
                        <>
                            <List>
                                <ListItem>
                                    <Link component={Link} to={"/dashboard"} sx={{}}>
                                        <Typography variant="drawer">Dashboard</Typography>
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <Link component={Link} to={""} sx={{}}>
                                        <Typography variant="drawer">Pedidos</Typography>
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <Link component={Link} to={""} sx={{}}>
                                        <Typography variant="drawer">Favoritos</Typography>
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <Link onClick={handleLogout} sx={{}}>
                                        <Typography variant="drawer">Cerrar sesión</Typography>
                                    </Link>
                                </ListItem>
                            </List>
                        </>
                    ) : (
                        <Link component={Link} to={"/Login"} >
                            <Typography variant="drawer">Iniciar sesión</Typography>
                        </Link>
                    )}
            </nav>
        </Box>

    );

}

export default NavList;