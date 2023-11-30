import "../footer/Footer.css"
import eneBlanco from "../../../assets/eneBlanco.png"
import naturalBlanco from "../../../assets/naturalBlanco.png"
import twitter from "../../../assets/twitter.svg"
import facebook from "../../../assets/facebook.svg"
import instagram from "../../../assets/instagram.svg"
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";


const Footer = () => {

    return (
        <ThemeProvider theme={theme}>
        <footer className="pie-pagina">
            <div className="grupo-1">
                <div className="box">
                    <figure>
                        <a href="#">
                        <img src={eneBlanco} style={{ width: '303.351px', height: '302.212px', transform: 'rotate(-30deg)', flexShrink: 0, }} alt="Descripción de la imagen" />
                        </a>
                    </figure>
                </div>
                <div className="box">
                <img src={naturalBlanco} style={{ width: '144px', height: '24px', flexShrink: 0 }} alt="Descripción de la imagen" />
                    <Typography variant="h6">Comida saludable congelada</Typography>
                </div>
                <div className="box">
                    <Typography variant="h4">Secciones</Typography>
                    <Typography variant="h5">Home</Typography>
                    <Typography variant="h5">Productos</Typography>
                    <Typography variant="h5">Carrito</Typography>
                    <Typography variant="h5">Perfil</Typography>
                </div>
                <div className="box">
                <Typography variant="h4">Ayuda y soporte</Typography>
                    <Typography variant="h5">Contactanos</Typography>
                    <Typography variant="h5">Opciones de entrega</Typography>
                    <Typography variant="h5">Términos y condiciones</Typography>
                    <Typography variant="h5">Quienes somos</Typography>
                </div>
                <div className="box">
                    <Typography variant="h4">Seguinos en nuestras redes</Typography>
                    <div className="red-social">
                        <a href="#" className="fa fa-instagram"><img src={instagram} style={{ width: '24px', height: '24px' }} alt="Descripción de la imagen" /></a>
                        <a href="#" className="fa fa-twitter"><img src={twitter} style={{ width: '24px', height: '24px' }} alt="Descripción de la imagen" /></a>
                        <a href="#" className="fa fa-facebook"><img src={facebook} style={{ width: '24px', height: '24px' }} alt="Descripción de la imagen" /></a>
                    </div>
                </div>
            </div>
            <div className="grupo-2">
                <small>&copy; 2023 <b>Equipo CH</b> - Todos los derechos reservados.</small>
            </div>
        </footer>
        </ThemeProvider>
    );
}

export default Footer;