import { Box, Button, FormControl, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp, db } from "../../../firebaseConfig";
import { setDoc, doc } from "firebase/firestore"
import natural from "../../../assets/natural.png"
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import { useFormik } from 'formik';
import * as Yup from 'yup';


const Register = () => {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
      .required('Nombre es obligatorio')
      .matches(/^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s']+$/, 'No debe contener números o símbolos'),
      last_name: Yup.string()
      .required('Apellido es obligatorio')
      .matches(/^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s']+$/, 'No debe contener números o símbolos'),
      email: Yup.string()
      .email('Email no válido')
      .required('Email es obligatorio'),
      password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres').required('Contraseña es obligatoria'),
      confirmPassword: Yup.string()
      .required('Confirmar contraseña es obligatorio')
      .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir"),
    }),

    onSubmit: async (values) => {
      let res = await signUp(values);
      if (res.user.uid) {
        await setDoc(doc(db, 'users', res.user.uid), { rol: 'user' });
      }
      navigate('/login');
    },
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);


  return (
    <div className="boxContainer">
      <div className="box">
        <ThemeProvider theme={theme}>
          <img src={natural} alt="Nombre del emprendimiento: Natural" />
          <Typography variant="h2" className="subtitulo">Compra más rápido y lleva el control de tus pedidos, ¡en un solo lugar!</Typography>
          <form onSubmit={handleSubmit}>
            <div>
              <div style={{ marginBottom: "20px" }} className="textContainer" >
                <Typography variant="h4Custom">Nombre:</Typography>
                <TextField name="name" className="textField" onChange={handleChange} value={values.name} error={errors.name} helperText={errors.name} />
              </div>
              <div style={{ marginBottom: "20px" }} className="textContainer" >
                <Typography variant="h4Custom">Apellido:</Typography>
                <TextField name="last_name" className="textField" onChange={handleChange} value={values.last_name} error={errors.last_name} helperText={errors.last_name} />
              </div>
              <div style={{ marginBottom: "10px" }} className="textContainer" >
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
              <div className="textContainer">
                <FormControl variant="outlined" className="textField">
                  <Typography variant="h4Custom">Confirmar contraseña</Typography>
                  <TextField sx={{ marginBottom: "20px" }}
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    onChange={handleChange} value={values.confirmPassword} error={errors.confirmPassword} helperText={errors.confirmPassword}
                    InputProps={{
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