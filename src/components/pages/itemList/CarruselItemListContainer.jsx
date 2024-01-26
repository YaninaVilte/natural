import { Typography } from "@mui/material";
import productosEstrellas from "../../../assets/productosEstrellas.png"
import enviosExpress from "../../../assets/enviosExpress.jpg"
import atencionPersonalizada from "../../../assets/atencionPersonalizada.jpg"




const CarouselItemListContainer = () => {
    return (
        <div>
            <div className="carrusel">
                <div className="carruselContainer">
                    <Typography variant="h1" sx={{ fontSize: "2.5rem", marginBottom: "1.875rem" }}>¡Nuestros productos estrellas!</Typography>
                    <Typography variant="carrusel">Estos son los productos que nuestros clientes adoran.</Typography>
                    <Typography variant="carrusel" sx={{ fontWeight: "600" }} >¿Cuál será tu próximo favorito?</Typography>
                </div>
                <img src={productosEstrellas} alt="Productos Estrellas" />
            </div>
            <div className="carrusel">
                <div className="carruselContainer">
                    <Typography variant="h1" sx={{ fontSize: "2.5rem", marginBottom: "1.875rem" }}>¡Envíos express!</Typography>
                    <Typography variant="carrusel">Hacemos que comer saludable sea aún más fácil.</Typography>
                    <Typography variant="carrusel" sx={{ fontWeight: "600" }} >Compra ahora y disfruta del envío gratis en productos seleccionados.</Typography>
                </div>
                <img src={enviosExpress} alt="Envíos Express" />
            </div>
            <div className="carrusel">
                <div className="carruselContainer">
                    <Typography variant="h1" sx={{ fontSize: "2.5rem", marginBottom: "1.875rem" }}>Atención personalizada</Typography>
                    <Typography variant="carrusel">Estamos aquí para asegurarnos de que tu experiencia con nosotros sea excepcional en cada paso del camino y <Typography variant="carrusel" sx={{ fontWeight: "600" }} >estamos comprometidos a superar tus expectativas.</Typography></Typography>
                    
                </div>
                <img src={atencionPersonalizada} alt="Atención Personalizada" />
            </div>
        </div>
    );
};

export default CarouselItemListContainer;