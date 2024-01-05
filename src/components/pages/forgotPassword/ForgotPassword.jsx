import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../firebaseConfig";
import natural from "../../../assets/natural.png"
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
      fontStyle: 'italic', // Familia de fuente
    },
  },
});

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("")

  const handleSubmit = async (e)=>{
    e.preventDefault()
    let res = await forgotPassword(email)
    navigate("/login")
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "40px",
          // backgroundColor: theme.palette.secondary.main,
        }}
      >
          <img src={natural} style={{ width: "154px", height: "26px" }} alt="Descripción de la imagen" />
          <Typography variant="h2" style={{ marginTop: "20px", marginBottom: "50px" }}>¿Olvidaste tu contraseña?</Typography>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            rowSpacing={2}
            // alignItems="center"
            justifyContent={"center"}
          >
            <Grid item xs={10} md={12}>
                <Typography variant="h4Custom">Email:</Typography>
              <TextField
                type="text"
                variant="outlined"
                label="Email"
                fullWidth
                name="email"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={10} md={12}>
                <BootstrapButton type="submit" variant="contained" fullWidth>
                  <Typography variant="h4">Recuperar</Typography>
                </BootstrapButton>
            </Grid>
            <Grid item xs={10} md={12}>
                <Typography variant="h5" onClick={() => navigate("/login")} sx={{ textTransform: "none", cursor: "pointer", color: "#164439", fontWeight: "500" }}>Regresar</Typography>
            </Grid>
          </Grid>
        </form>
      </Box>
      </ThemeProvider>
    </div>
  );
};

export default ForgotPassword;
