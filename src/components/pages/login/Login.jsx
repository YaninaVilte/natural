import { Box, Button, FormControl, Grid, IconButton, InputAdornment, OutlinedInput, TextField, Tooltip, Typography, } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useContext, useState } from "react";
import { db, loginGoogle, onSigIn } from "../../../firebaseConfig";
import {collection, doc, getDoc} from "firebase/firestore"
import { AuthContext } from "../../../context/AuthContext";
import natural from "../../../assets/natural.png"
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import { styled } from '@mui/material/styles';


const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  borderRadius: "0px",
  textTransform: 'none',
  width: "592px",
  height: "48px",
  backgroundColor: '#164439',
  '&:hover': {
    boxShadow: 'none',
    backgroundColor: '#164439',
    textAlign: 'center',
    '& svg': {
      color: '#41A88A',
    },
    '& .MuiTypography-root': {
      color: '#41A88A',
      textShadow: '1px 1px 0px rgba(0, 0, 0, 0.25)',
      fontStyle: 'italic',
    },
  },
});



const Login = () => {
  const {handleLogin} = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  

  const handleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await onSigIn(userCredentials);
      if(res?.user){
        const userCollection = collection(db, "users")
        const userRef = doc(userCollection, res.user.uid )
        const userDoc = await getDoc(userRef)
        let finalyUser = {
          email: res.user.email,
          rol: userDoc.data().rol
        }
        handleLogin(finalyUser)
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const googleSingIn = async ()=>{
    let res = await loginGoogle()
    let finalyUser = {
      email: res.user.email,
      rol: "user"
    }
    handleLogin(finalyUser)
    navigate("/")
  }

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <ThemeProvider theme={theme}>
      <img src={natural} style={{ width: "154px", height: "26px" }} alt="Descripción de la imagen" />
        <Typography variant="h2" style={{ marginTop: "20px", marginBottom: "50px" }}>Compra más rápido y lleva el control de tus pedidos, ¡en un solo lugar!</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container rowSpacing={2} justifyContent={"center"}>
          <Grid item xs={10} md={12} style={{ marginBottom: "20px" }}>
              <Typography variant="h4Custom">Email:</Typography>
              <TextField name="email" placeholder="Ejem:Tunombre@gmail.com" sx={{ width: "592px" }} onChange={handleChange} style={{ marginTop: "10px" }}/>
          </Grid>
          <Grid item xs={10} md={12}>
            <Typography variant="h4Custom">Contraseña:</Typography>
              <FormControl sx={{ width: "592px" }} >
              <OutlinedInput name="password" style={{ marginTop: "10px" }} onChange={handleChange} id="outlined-adornment-password" type={showPassword ? "text" : "password"} endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end"> {showPassword ? ( <VisibilityOff color="primary" />) : ( <Visibility color="primary" /> )}
                  </IconButton>
                </InputAdornment>
                } label="Contraseña"/>
            </FormControl>
          </Grid>
          <Link to="/forgot-password" style={{ marginTop: "10px" }}><Typography variant="reset">¿Olvidaste tu contraseña?</Typography></Link>
          <Grid container justifyContent="center" spacing={3} mt={2}>
            <Grid item xs={10} md={5}>
                <BootstrapButton variant="contained" type="submit" sx={{ textTransform: "none" }}><Typography variant="h4">Iniciar sesión</Typography>
                  <Box m={0.3} />
                </BootstrapButton>
            </Grid>
            <Grid item xs={10} md={5}>
              <Tooltip title="ingresa con google">
                  <BootstrapButton variant="contained" startIcon={<GoogleIcon />} onClick={googleSingIn} type="button" fullWidth sx={{ width: "592px", height: "48px", textTransform: "none", }}>
                  <Typography variant="h4">Ingresa con google</Typography>
                  </BootstrapButton>
              </Tooltip>
            </Grid>
            <Grid container justifyContent="center" alignItems="center" sx={{ marginTop: "10px" }}>
              <Grid item xs={10} md={8} container justifyContent="center" alignItems="center">
                <Typography variant="h5" align="center" sx={{ color: "#164439" }}>¿No tenés una cuenta?</Typography>
                <Box m={0.1} />
                <Typography variant="h5" onClick={() => navigate("/register")} sx={{ textTransform: "none", cursor: "pointer", color: "#164439", fontWeight: "500" }}>Crear cuenta</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
      </ThemeProvider>
    </Box>
  );
};

export default Login;
