import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useContext, useState } from "react";
import { menuItemsAdmin } from "../../../router/navigationAdmin";
import { AuthContext } from "../../../context/AuthContext";
import eneBlanco from "../../../assets/eneBlanco.png"
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";
import { Icon } from '@iconify/react';
import naturalBlanco from "../../../assets/naturalBlanco.png"
import NavListResponsive from "./NavListResponsive";
import NavList from "./NavList";


function Navbar() {
  const { user } = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);


<<<<<<< HEAD
  
=======
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

>>>>>>> secondDevelop
  return (
    <Box sx={{ display: "flex", position:'sticky', top:'0', left:'0', zIndex:'9999'}}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
<<<<<<< HEAD
        <AppBar component="nav" position="fixed" sx={{ width: "100%", backgroundColor: "#164439", display: "flex" }}>
=======
        <AppBar component="nav" position="sticky" sx={{ top:'0', left:'0', width: "100%", backgroundColor: "#164439", display: "flex" }}>
>>>>>>> secondDevelop
        <Box sx={{ display: { xs: 'none', sm: 'block', } }}>
            <Toolbar sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: "5.125rem" }}>
              <div style={{ display: "flex", alignItems: "center", marginRight: "2.5rem" }}>
                <Link to="/"><img src={eneBlanco} style={{ width: "2.5rem", height: "2.5rem", alignItems: "center" }} alt="N" /></Link>
              </div>
              <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                {menuItemsAdmin.map(({ id, path, title }) => (
                  <Link component={Link} key={id} to={path}>
                    <Typography variant="h4" sx={{ fontSize: "1rem", marginRight: "1.5rem" }}>{title}</Typography>
                  </Link>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{}}>
                  <Link component={Link} to={"/cart"}>
                    <Icon icon="fontisto:shopping-basket" width="24" height="24" color="#FFFFFF" />
                  </Link>
                </div>
                <div style={{ marginLeft: "1.5rem" }}>
                  {user && user.email ? (
                    <>
                      <Link onClick={() => setListOpen(true)} >
                        <Typography variant="h4" sx={{ fontSize: "1rem" }}>Perfil</Typography>
                      </Link>
                    </>
                  ) : (
                    <Link component={Link} to={"/Login"} >
                          <Typography variant="h4" sx={{ fontSize: "1rem" }}>Iniciar sesión</Typography>
                    </Link>
                  )}
                </div>
              </div>

              <Drawer open={listOpen} anchor="right" onClose={() => setListOpen(false)} elemento PaperProps={{
                sx: {
                  width: "15rem",
                  height: "9rem",
                  zIndex: "1", backgroundColor: "#F8F8F8", marginTop: "5.2rem"
                },
              }}>
                <NavList setListOpen={setListOpen} />
              </Drawer>
              
            </Toolbar>
        </Box>
          
      </AppBar>
<<<<<<< HEAD

        <nav style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: "5.125rem", width: "100%", backgroundColor: "#164439" }}>

          <IconButton sx={{ display: { sm: 'none' }, height: "5.125rem", marginLeft: "1.25rem", color: "#FFF" }} color="secondary.primary" aria-label="open drawer" edge="start" onClick={() => setDrawerOpen(true)}>
            <MenuIcon color="secondary.primary" />
          </IconButton>

          <Link to="/"><img src={naturalBlanco} style={{ width: "12rem", alignItems: "center" }} alt="Natural" /></Link>

          <Link component={Link} to={"/cart"}>
            <Icon icon="fontisto:shopping-basket" width="24" height="24" color="#FFFFFF" style={{ marginRight: "1.25rem" }} />
          </Link>

          <Drawer open={drawerOpen} anchor="left" onClose={() => setDrawerOpen(false)} PaperProps={{
            sx: {
              width: "15rem",
              height: "14rem", backgroundColor: "#F8F8F8", marginTop: "5.2rem"
            },
          }}>
            <NavListResponsive setDrawerOpen={setDrawerOpen} />
          </Drawer>

      </nav>
=======
        {/* <nav style={{ width: "100%", backgroundColor: "#164439", position: "fixed" }}>
            
          <IconButton sx={{ mr: 2, display: { sm: 'none' }, height: "5.125rem", marginLeft: "1.25rem", color: "#FFF" }} color="secondary.primary" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
            <MenuIcon color="secondary.primary" />
          </IconButton>
          <Drawer container={container} variant="temporary" open={mobileOpen} anchor={"left"} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true, }} sx={{ display: { xs: "block" }, "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, height: "22.5rem", }, }}>{drawer}</Drawer>
          <Link to="/"><img src={naturalBlanco} style={{ width: "30%", alignItems: "center" }} alt="Natural" /></Link>
      </nav> */}
      
>>>>>>> secondDevelop
      </ThemeProvider>

    </Box>
  );
}

export default Navbar;