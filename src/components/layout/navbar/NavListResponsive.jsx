import { List, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../firebaseConfig";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { menuItemsAdmin } from "../../../router/navigationAdmin";

function NavListResponsive() {
    const { logoutContext, user } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        logoutContext();
        navigate("/");
    };

    const rolAdmin = import.meta.env.VITE_ROL_ADMIN;

    return (
        <div>
            <Toolbar />
            <List sx={{ display: "flex", flexDirection: "column", marginLeft: "0.938rem", lineHeight: "2.5", width: "10rem" }}>
                {menuItemsAdmin.map(({ id, path, title }) => (
                    <Link component={Link} key={id} to={path} sx={{}}>
                        <Typography variant="drawer">{title}</Typography>
                    </Link>
                ))}

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

        </div>

    );

}

export default NavListResponsive;