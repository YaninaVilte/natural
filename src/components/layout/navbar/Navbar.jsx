import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useContext, useState } from "react";
import { menuItemsAdmin } from "../../../router/navigationAdmin";
import { logout } from "../../../firebaseConfig";
import { AuthContext } from "../../../context/AuthContext";
import eneBlanco from "../../../assets/eneBlanco.png"
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";
import { Icon } from '@iconify/react';



const drawerWidth = 240;

function Navbar(props) {
  const { logoutContext, user } = useContext(AuthContext);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const [profileAdminDrawerOpen, setProfileAdminDrawerOpen] = useState(false);


  const navigate = useNavigate();
  const rolAdmin = import.meta.env.VITE_ROL_ADMIN;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    logoutContext();
    navigate("/");
  };



  const drawer = (
    <div>
      <Toolbar />
      <List sx={{ display: "flex", flexDirection: "column", marginLeft: "15px", lineHeight: "2.5" }}>
        {menuItemsAdmin.map(({ id, path, title }) => (
          <Link component={Link} key={id} to={path} sx={{}}>
            <Typography variant="drawer">{title}</Typography>
          </Link>
        ))}

        <Link component={Link} to={"/cart"}>
          <Typography variant="drawer">Carrito</Typography>
        </Link>


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

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex"}}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <AppBar component="nav" position="fixed" sx={{ width: "100%", height: "82px", backgroundColor: "#164439", display: "flex", alignContent: "center" }}>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Toolbar sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignContent: "center" }}>
            
            <Link to="/"><img src={eneBlanco} style={{ width: "40px", height: "40px" }} alt="Descripción de la imagen" /></Link>
              {menuItemsAdmin.map(({ id, path, title }) => (
                <Link component={Link} key={id} to={path} sx={{}}>
                  <Typography variant="h4" sx={{ fontSize: "16px" }}>{title}</Typography>
                </Link>
              ))}

              <Link component={Link} to={"/cart"}>
                <Icon icon="fontisto:shopping-basket" width="24" height="24" color="#FFFFFF" />
              </Link>
              
              
              {user && user.email && user.rol !== rolAdmin ? (
                <>
                  <Link onClick={() => setProfileDrawerOpen(true)}>
                    <Typography variant="h4" sx={{ fontSize: "16px" }}>Perfil</Typography>
                  </Link>
                </>
              ) : user && user.rol === rolAdmin ? (
                <>
                    <Link onClick={() => setProfileAdminDrawerOpen(true)}>
                      <Typography variant="h4" sx={{ fontSize: "16px" }}>Perfil</Typography>
                    </Link>
                </>
              ) : (
                <Link component={Link} to={"/Login"} >
                  <Typography variant="h4" sx={{ fontSize: "16px" }}>Iniciar sesión</Typography>
                </Link>
              )}


              <Drawer container={container} variant="temporary" open={profileDrawerOpen} anchor="right" onClose={() => setProfileDrawerOpen(false)} ModalProps={{ keepMounted: true }}
                sx={{ "& .MuiDrawer-paper": { boxSizing: "border-box", marginTop: "85px", width: drawerWidth, height: "250px", backgroundColor: "#F8F8F8", }, }}>
                <Toolbar />
                <List sx={{ display: "flex", flexDirection: "column", marginLeft: "15px", lineHeight: "2.5" }}>
                      <Link component={Link} to={""} sx={{}}>
                    <Typography variant="drawer" onClick={() => setProfileDrawerOpen(false)}>Mis Pedidos</Typography>
                      </Link>
                      <Link component={Link} to={""} sx={{}}>
                    <Typography variant="drawer" onClick={() => setProfileDrawerOpen(false)}>Favoritos</Typography>
                      </Link>
                      <Link onClick={handleLogout} sx={{}}>
                    <Typography variant="drawer" onClick={() => setProfileDrawerOpen(false)}>Cerrar sesión</Typography>
                      </Link>
                </List>
              </Drawer>


              <Drawer container={container} variant="temporary" open={profileAdminDrawerOpen} anchor="right" onClose={() => setProfileAdminDrawerOpen(false)} ModalProps={{ keepMounted: true }}
                sx={{ "& .MuiDrawer-paper": { boxSizing: "border-box", marginTop: "85px", width: drawerWidth, height: "250px", backgroundColor: "#F8F8F8", }, }}>
                <Toolbar />
                <List sx={{ display: "flex", flexDirection: "column", marginLeft: "15px", lineHeight: "2.5" }}>
                  <Link component={Link} to={"/dashboard"} sx={{}} >
                    <Typography variant="drawer" onClick={() => setProfileAdminDrawerOpen(false)}>Dashboard</Typography>
                  </Link>
                  <Link component={Link} to={""} sx={{}}>
                    <Typography variant="drawer" onClick={() => setProfileAdminDrawerOpen(false)}>Pedidos</Typography>
                  </Link>
                  <Link component={Link} to={""} sx={{}}>
                    <Typography variant="drawer" onClick={() => setProfileAdminDrawerOpen(false)} >Favoritos</Typography>
                  </Link>
                  <Link onClick={handleLogout} sx={{}}>
                    <Typography variant="drawer" onClick={() => setProfileAdminDrawerOpen(false)} >Cerrar sesión</Typography>
                  </Link>
                </List>
              </Drawer>


            </Toolbar>
        </Box>
          <IconButton sx={{ mr: 2, display: { sm: 'none' } }} color="secondary.primary" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
            <MenuIcon color="secondary.primary" />
          </IconButton>
      </AppBar>
      <nav>

          <Drawer container={container} variant="temporary" open={mobileOpen} anchor={"right"} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true, }} sx={{ display: { xs: "block" }, "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, height: "360px", backgroundColor: "##F8F8F8F", }, }}>{drawer}</Drawer>
        <Toolbar />
      </nav>
      </ThemeProvider>
    </Box>
  );
}

export default Navbar;