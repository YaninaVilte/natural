import { Button, TextField, Typography } from "@mui/material";
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../firebaseConfig";
import natural from "../../../assets/natural.png"
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ForgotPassword = () => {
  const navigate = useNavigate();


  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email no válido')
        .required('Email es obligatorio'),
    }),

    onSubmit: async (values) => {
      let res = await forgotPassword(values.email)
      navigate("/login")
    }

  });

  return (
    <div className="boxContainer">
      <ThemeProvider theme={theme}>
        <div className="box">
          <img src={natural} alt="Nombre del emprendimiento: Natural" />
          <Typography variant="h2" className="subtitulo">¿Olvidaste tu contraseña?</Typography>
          <form onSubmit={handleSubmit}>
            <div>
              <div style={{ marginBottom: "1.25rem" }} className="textContainer" >
                <Typography variant="h4Custom">Email:</Typography>
                <TextField name="email" placeholder="Ejem:Tunombre@gmail.com" className="textField" onChange={handleChange} value={values.email} error={errors.email} helperText={errors.email} />
              </div>
              <div className="textContainer">
                <Button variant="contained" type="submit" className="button">
                  <Typography variant="h4">Recuperar</Typography>
                </Button>
              </div>
              <div className="textContainerRow">
                <Typography variant="h5" onClick={() => navigate("/login")} sx={{ textTransform: "none", cursor: "pointer", color: "#164439", fontWeight: "500" }}>Regresar</Typography>
              </div>
            </div>
          </form>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default ForgotPassword;