import { Box, Button, FormControl, IconButton, InputAdornment,  OutlinedInput, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp, db } from "../../../firebaseConfig";
import {setDoc, doc} from "firebase/firestore"
import natural from "../../../assets/natural.png"
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";


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
    <div className="boxContainer">
      <div className="box">
      <ThemeProvider theme={theme}>
          <img src={natural} alt="Nombre del emprendimiento: Natural" />
          <Typography variant="h2" className="subtitulo">Compra más rápido y lleva el control de tus pedidos, ¡en un solo lugar!</Typography>
      <form onSubmit={handleSubmit}>
            <div>
              <div style={{ marginBottom: "20px" }} className="textContainer" >
              <Typography variant="h4Custom">Email:</Typography>
              <TextField name="email" placeholder="Ejem:Tunombre@gmail.com" className="textField" onChange={handleChange}/>
          </div>
              <div className="textContainer">
              <FormControl variant="outlined" className="textField">
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
          </div>
          <div className="textContainer">
                <FormControl variant="outlined" className="textField">
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
          </div>
              <div>
                <div>
                  <Button variant="contained" type="submit" className="button">
                  <Typography variant="h4">Crear cuenta</Typography>
                </Button>
            </div>
                <div className="textContainerRow">
              <Typography variant="h5" align="center" sx={{ color: "#164439" }}>¿Ya tenés una cuenta?</Typography>
              <Box m={0.1} />
                <Typography variant="h5" onClick={() => navigate("/login")} sx={{ textTransform: "none", cursor: "pointer", color: "#164439", fontWeight: "500" }}>Iniciá sesión</Typography>
            </div>
          </div>
        </div>
      </form>
      </ThemeProvider>
      </div>
    </div>
  );
};

export default Register;