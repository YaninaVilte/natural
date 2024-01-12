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
import naturalBlanco from "../../../assets/naturalBlanco.png"


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

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", position:'sticky', top:'0', left:'0', zIndex:'9999'}}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <AppBar component="nav" position="sticky" sx={{ top:'0', left:'0', width: "100%", backgroundColor: "#164439", display: "flex" }}>
        <Box sx={{ display: { xs: 'none', sm: 'block', } }}>
          <Toolbar sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center",  height: "82px" }}>
            
              <Link to="/"><img src={eneBlanco} style={{ width: "40px", height: "40px", alignItems: "center" }} alt="N" /></Link>
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
          
      </AppBar>
        {/* <nav style={{ width: "100%", backgroundColor: "#164439", position: "fixed" }}>
            
          <IconButton sx={{ mr: 2, display: { sm: 'none' }, height: "82px", marginLeft: "20px", color: "#FFF" }} color="secondary.primary" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
            <MenuIcon color="secondary.primary" />
          </IconButton>
          <Drawer container={container} variant="temporary" open={mobileOpen} anchor={"left"} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true, }} sx={{ display: { xs: "block" }, "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, height: "360px", }, }}>{drawer}</Drawer>
          <Link to="/"><img src={naturalBlanco} style={{ width: "30%", alignItems: "center" }} alt="Natural" /></Link>
      </nav> */}
      
      </ThemeProvider>
    </Box>
  );
}

export default Navbar;