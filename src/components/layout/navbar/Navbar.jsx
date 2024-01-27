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
import NavListDrawer from "./NavListDrawer";
import NavAdminListDrawer from "./NavAdminListDrawer";
import DrawerResponsive from "./DrawerResponsive";


function Navbar() {
  const { logoutContext, user } = useContext(AuthContext);
  const [adminOpen, setAdminOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);


  const rolAdmin = import.meta.env.VITE_ROL_ADMIN;




  return (
    <Box sx={{ display: "flex"}}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <AppBar component="nav" position="fixed" sx={{ width: "100%", backgroundColor: "#164439", display: "flex" }}>
        <Box sx={{ display: { xs: 'none', sm: 'block', } }}>
            <Toolbar sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: "5.125rem" }}>
              <div style={{ display: "flex", alignItems: "center", marginRight: "2.5rem" }}>
                <Link to="/"><img src={eneBlanco} style={{ width: "2.5rem", height: "2.5rem", alignItems: "center" }} alt="N" /></Link>
              </div>
              <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                {menuItemsAdmin.map(({ id, path, title }) => (
                  <Link component={Link} key={id} to={path} sx={{ }}>
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
                  {user && user.email && user.rol !== rolAdmin ? (
                    <>
                      <Link onClick={() => setUserOpen (true) } >
                        <Typography variant="h4" sx={{ fontSize: "1rem" }}>Perfil</Typography>
                      </Link>
                    </>
                  ) : user && user.rol === rolAdmin ? (
                    <>
                      <Link onClick={() => setAdminOpen(true)}>
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
              
              <Drawer open={userOpen} anchor="left" onClose={() => setUserOpen(false)} >
                <NavListDrawer/>
              </Drawer>

              <Drawer open={adminOpen} anchor="left" onClose={() => setAdminOpen(false)} >
                <NavAdminListDrawer/>
              </Drawer>



            </Toolbar>
        </Box>
          
      </AppBar>

        <nav style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: "5.125rem", width: "100%", backgroundColor: "#164439" }}>

          <IconButton sx={{ display: { sm: 'none' }, height: "5.125rem", marginLeft: "1.25rem", color: "#FFF" }} color="secondary.primary" aria-label="open drawer" edge="start" onClick={() => setDrawerOpen(true)}>
            <MenuIcon color="secondary.primary" />
          </IconButton>

          <Link to="/"><img src={naturalBlanco} style={{ width: "12rem", alignItems: "center" }} alt="Natural" /></Link>

          <Link component={Link} to={"/cart"}>
            <Icon icon="fontisto:shopping-basket" width="24" height="24" color="#FFFFFF" style={{ marginRight: "1.25rem" }} />
          </Link>

          <Drawer open={drawerOpen} anchor="left" onClose={() => setDrawerOpen(false)} >
            <DrawerResponsive />
          </Drawer>

      </nav>
      </ThemeProvider>

    </Box>
  );
}

export default Navbar;