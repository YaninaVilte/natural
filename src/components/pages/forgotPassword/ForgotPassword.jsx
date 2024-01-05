import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../firebaseConfig";
import natural from "../../../assets/natural.png"


const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("")

  const handleSubmit = async (e)=>{
    e.preventDefault()
    let res = await forgotPassword(email)
    navigate("/login")
  }

  return (
    <div className="boxContainer">
      <ThemeProvider theme={theme}>
      <div className="box">
          <img src={natural} alt="Nombre del emprendimiento: Natural" />
          <Typography variant="h2" className="subtitulo">¿Olvidaste tu contraseña?</Typography>
        <form onSubmit={handleSubmit}>
            <div>
              <div style={{ marginBottom: "20px" }} className="textContainer" >
                <Typography variant="h4Custom">Email:</Typography>
              <TextField
                type="text"
                variant="outlined"
                label="Email"
                name="email"
                onChange={(e)=>setEmail(e.target.value)}
                  className="textField"
              />
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
