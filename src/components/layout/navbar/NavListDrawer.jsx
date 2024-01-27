import { Box, List, ListItem, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../firebaseConfig";
import { useContext} from "react";
import { AuthContext } from "../../../context/AuthContext";

function NavListDrawer() {
    const { logoutContext, user } = useContext(AuthContext);
    
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        logoutContext();
        navigate("/");
    };

    const rolAdmin = import.meta.env.VITE_ROL_ADMIN;


    return (
        <Box sx={{ width: "15rem", bgcolor: "#F8F8F8", marginTop: "3rem" }}>
            <nav>
                <List>
                    <ListItem>
                        <Link component={Link} to={""} sx={{}}>
                            <Typography variant="drawer" sx={{ fontSize: "1rem" }}>Pedidos</Typography>
                        </Link>
                    </ListItem>

                    <ListItem>
                        <Link component={Link} to={""} sx={{}}>
                            <Typography variant="drawer" sx={{ fontSize: "1rem" }}>Favoritos</Typography>
                        </Link>
                    </ListItem>

                    <ListItem>
                        <Link onClick={handleLogout} sx={{}}>
                            <Typography variant="drawer" sx={{ fontSize: "1rem" }}>Cerrar Sesión</Typography>
                        </Link>
                    </ListItem>

                    {user && user.email && user.rol !== rolAdmin ? (
                        <>
                            <Link component={Link} to={""} sx={{}}>
                                <Typography variant="drawer">Mis Pedidos</Typography>
                            </Link>
                            <Link component={Link} to={""} sx={{}}>
                                <Typography variant="drawer">Favoritos</Typography>
                            </Link>
                            <Link onClick={handleLogout} sx={{}}>
                                <Typography variant="drawer">Cerrar sesión</Typography>
                            </Link>
                        </>
                    ) : user && user.rol === rolAdmin ? (
                        <>
                            <Link component={Link} to={"/dashboard"} sx={{}}>
                                <Typography variant="drawer">Dashboard</Typography>
                            </Link>
                            <Link component={Link} to={""} sx={{}}>
                                <Typography variant="drawer">Pedidos</Typography>
                            </Link>
                            <Link component={Link} to={""} sx={{}}>
                                <Typography variant="drawer">Favoritos</Typography>
                            </Link>
                            <Link onClick={handleLogout} sx={{}}>
                                <Typography variant="drawer">Cerrar sesión</Typography>
                            </Link>
                        </>
                    ) : (
                        <Link component={Link} to={"/Login"} >
                            <Typography variant="drawer">Iniciar sesión</Typography>
                        </Link>
                    )}
                    
                </List>
            </nav>
        </Box>

    );

}

export default NavListDrawer;