import { Box, Button, FormControl, IconButton, InputAdornment, TextField, Tooltip, Typography, } from "@mui/material";
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
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const {handleLogin} = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email no válido')
        .required('Email es obligatorio'),
      password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres').required('Contraseña es obligatoria'),
    }),

    onSubmit: async (values) => {
    try {
      const res = await onSigIn(values);
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
  }

});

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
    <div className="boxContainer">
    <div className="box">
      <ThemeProvider theme={theme}>
      <img src={natural} alt="Nombre del emprendimiento: Natural" />
        <Typography variant="h2" className="subtitulo">Compra más rápido y lleva el control de tus pedidos, ¡en un solo lugar!</Typography>
      <form onSubmit={handleSubmit}>
          <div>
              <div style={{ marginBottom: "1.25rem" }} className="textContainer" >
                <Typography variant="h4Custom">Email:</Typography>
                <TextField name="email" placeholder="Ejem:Tunombre@gmail.com" className="textField" onChange={handleChange} value={values.email} error={errors.email} helperText={errors.email} />
            </div>
            <div className="textContainer">
                <FormControl variant="outlined" className="textField">
                  <Typography variant="h4Custom">Contraseña:</Typography>
                  <TextField id="outlined-adornment-password" type={showPassword ? "text" : "password"} name="password" onChange={handleChange} value={values.password} error={errors.password} helperText={errors.password} InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff style={{ color: "#164439" }} />
                          ) : (
                            <Visibility style={{ color: "#164439" }} />
                          )}

                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  />
                </FormControl>
            </div>
              <Link to="/forgot-password" style={{ marginTop: "0.625rem" }}><Typography variant="reset">¿Olvidaste tu contraseña?</Typography></Link>
              <div className="textContainer">
              <div>
                <Button variant="contained" type="submit" className="button"><Typography variant="h4">Iniciar sesión</Typography>
                </Button>
              </div>
                <div>
                  <Tooltip title="ingresa con google">
                  <Button variant="contained" startIcon={<GoogleIcon />} onClick={googleSingIn} type="button" className="button" >
                  <Typography variant="h4">Ingresa con google</Typography>
                  </Button>
              </Tooltip>
              </div>
              <div>
                  <div className="textContainerRow">
                <Typography variant="h5" align="center" sx={{ color: "#164439" }}>¿No tenés una cuenta?</Typography>
                <Box m={0.1} />
                <Typography variant="h5" onClick={() => navigate("/register")} sx={{ textTransform: "none", cursor: "pointer", color: "#164439", fontWeight: "500" }}>Crear cuenta</Typography>
                </div>
              </div>
            </div>
          </div>
      </form>
      </ThemeProvider>
    </div>
    </div>
  );
};

export default Login;
