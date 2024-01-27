import { Box, List, ListItem, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../firebaseConfig";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

function NavAdminListDrawer() {
    const { logoutContext, user } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        logoutContext();
        navigate("/");
    };


    return (
        <Box sx={{ width: "15rem", bgcolor: "#F8F8F8", marginTop: "3rem" }}>
            <nav>
                <List>
                    <ListItem>
                        <Link component={Link} to={"/dashboard"} sx={{}}>
                            <Typography variant="drawer" sx={{ fontSize: "1rem" }}>Dashboard</Typography>
                        </Link>
                    </ListItem>

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
                </List>
            </nav>
        </Box>

    );

}

export default NavAdminListDrawer;