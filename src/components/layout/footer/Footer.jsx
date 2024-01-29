import "../footer/Footer.css"
import eneBlanco from "../../../assets/eneBlanco.png"
import naturalBlanco from "../../../assets/naturalBlanco.png"
import twitter from "../../../assets/twitter.svg"
import facebook from "../../../assets/facebook.svg"
import instagram from "../../../assets/instagram.svg"
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";


const Footer = () => {

    return (
        <ThemeProvider theme={theme}>
        <footer className="pie-pagina">
                <div className="box">
                    <figure>
                            <img src={eneBlanco} style={{ transform: 'rotate(-30deg)', flexShrink: 0, }} alt="Descripción de la imagen" />
                    </figure>
                </div>
            <div className="grupo-1 container">
                <div className="logo">
                        <img src={naturalBlanco} style={{ width: '9rem', height: '1.5rem', flexShrink: 0 }} alt="Descripción de la imagen" />
                    <Typography variant="h6">Comida saludable congelada</Typography>
                </div>
                <div className="secciones">
                    <Typography variant="h4">Secciones</Typography>
                    <Link component={Link} to={"/"}>
                        <Typography variant="h5">Home</Typography>
                    </Link>
                    <Link component={Link} to={"/shop"}>
                        <Typography variant="h5">Productos</Typography>
                    </Link>
                    <Link component={Link} to={"/cart"}>
                        <Typography variant="h5">Carrito</Typography>
                    </Link>
                    <Link component={Link} to={""}>
                        <Typography variant="h5">Favoritos</Typography>
                    </Link>
                </div>
                <div className="soporte">
                    <Typography variant="h4">Ayuda y soporte</Typography>
                    <Link component={Link} to={""}>
                        <Typography variant="h5">Contactanos</Typography>
                    </Link>
                    <Link component={Link} to={""}>
                        <Typography variant="h5">Opciones de entrega</Typography>
                    </Link>
                    <Link component={Link} to={""}>
                        <Typography variant="h5">Términos y condiciones</Typography>
                    </Link>
                    <Link component={Link} to={""}>
                        <Typography variant="h5">Quienes somos</Typography>
                    </Link>
                </div>
                <div className="redes">
                    <Typography variant="h4">Seguinos en nuestras redes</Typography>
                    <div className="red-social">
                            <a href="https://www.instagram.com/natural.icy.market/" className="fa fa-instagram"><img src={instagram} style={{ width: '1.5rem', height: '1.5rem' }} alt="Logo Instagram" /></a>
                            <a href="#" className="fa fa-twitter"><img src={twitter} style={{ width: '1.5rem', height: '1.5rem' }} alt="Logo Twitter" /></a>
                            <a href="#" className="fa fa-facebook"><img src={facebook} style={{ width: '1.5rem', height: '1.5rem' }} alt="Logo Facebook" /></a>
                    </div>
                </div>
                <div className="equipo">
                        <Typography variant="h5">&copy; 2023 <b>Equipo CH</b> - Todos los derechos reservados.</Typography>
                </div>
            </div>
        </footer>
        </ThemeProvider>
    );
}

export default Footer;