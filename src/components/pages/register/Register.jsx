import { Box, Button, FormControl, Grid, IconButton, InputAdornment,  OutlinedInput, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp, db } from "../../../firebaseConfig";
import {setDoc, doc} from "firebase/firestore"
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

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email:"",
    password: "",
    confirmPassword: ""
  })

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (e)=>{
    setUserCredentials({...userCredentials, [e.target.name]: e.target.value})

  }
  const handleSubmit = async (e)=>{
    e.preventDefault()
    let res = await signUp(userCredentials)
    if(res.user.uid){
      await setDoc( doc(db, "users", res.user.uid ) , {rol : "user"}  )
    }
    navigate("/login")
  }

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <ThemeProvider theme={theme}>
        <img src={natural} style={{ width: "154px", height: "26px" }} alt="Descripción de la imagen" />
        <Typography variant="h2" style={{ marginTop: "20px", marginBottom: "50px" }}>Compra más rápido y lleva el control de tus pedidos, ¡en un solo lugar!</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container rowSpacing={2} justifyContent={"center"}>
          <Grid item xs={10} md={12}>
              <Typography variant="h4Custom">Email:</Typography>
              <TextField name="email" placeholder="Ejem:Tunombre@gmail.com" fullWidth onChange={handleChange} sx={{width: "592px"}}/>
          </Grid>
          <Grid item xs={10} md={12}>
            <FormControl variant="outlined" fullWidth>
              <Typography variant="h4Custom">Contraseña:</Typography>
              <OutlinedInput id="outlined-adornment-password" type={showPassword ? "text" : "password"} name="password" onChange={handleChange} endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                      {showPassword ? (<VisibilityOff color="primary" />) : (<Visibility color="primary" />
                  )}
                  </IconButton>
                </InputAdornment>
              }label="Contraseña"/>
            </FormControl>
          </Grid>
          <Grid item xs={10} md={12}>
            <FormControl variant="outlined" fullWidth>
                <Typography variant="h4Custom">Confirmar contraseña</Typography>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOff color="primary" />
                      ) : (
                        <Visibility color="primary" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirmar contraseña"
              />
            </FormControl>
          </Grid>
          <Grid container justifyContent="center" spacing={3} mt={2}>
            <Grid item xs={10} md={7}>
                <BootstrapButton variant="contained" fullWidth type="submit" sx={{ textTransform: "none" }}>
                  <Typography variant="h4">Crear cuenta</Typography>
                </BootstrapButton>
            </Grid>
              <Grid item xs={10} md={8} container justifyContent="center" alignItems="center">
              <Typography variant="h5" align="center" sx={{ color: "#164439" }}>¿Ya tenés una cuenta?</Typography>
              <Box m={0.1} />
                <Typography variant="h5" onClick={() => navigate("/login")} sx={{ textTransform: "none", cursor: "pointer", color: "#164439", fontWeight: "500" }}>Iniciá sesión</Typography>
            </Grid>
          </Grid>
        </Grid>
      </form>
      </ThemeProvider>
    </Box>
  );
};

export default Register;