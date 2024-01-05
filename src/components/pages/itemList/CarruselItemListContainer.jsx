import { Typography } from "@mui/material";
import productosEstrellas from "../../../assets/productosEstrellas.png"
import enviosExpress from "../../../assets/enviosExpress.jpg"
import atencionPersonalizada from "../../../assets/atencionPersonalizada.jpg"




const CarouselItemListContainer = () => {
    return (
        <div>
            <div style={{ background: "#164439", width: "100%", height: "633px", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "443px", height: "105px" }}>
                <Typography variant="h1" sx= {{ fontSize: "2.5rem", marginBottom: "30px" }}>¡Nuestros productos estrellas!</Typography>
                <Typography variant="carrusel">Estos son los productos que nuestros clientes adoran.</Typography>
                <Typography variant="carrusel" sx={{ fontWeight: "600" }} >¿Cuál será tu próximo favorito?</Typography>
            </div>
            <img src={productosEstrellas} style={{ width: "532px", height: "369px", borderTopRightRadius: "200px", borderBottomLeftRadius: "200px", marginLeft: "60px" }} alt="Descripción de la imagen" />
            </div>
            {/* <div style={{ background: "#164439", width: "100%", height: "633px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "443px", height: "105px" }}>
                    <Typography variant="h1" sx={{ fontSize: "2.5rem", marginBottom: "30px" }}>¡Envíos express!</Typography>
                    <Typography variant="carrusel">Hacemos que comer saludable sea aún más fácil.</Typography>
                    <Typography variant="carrusel" sx={{ fontWeight: "600" }} >Compra ahora y disfruta del envío gratis en productos seleccionados.</Typography>
                </div>
                <img src={enviosExpress} style={{ width: "532px", height: "369px", borderTopRightRadius: "200px", borderBottomLeftRadius: "200px", marginLeft: "60px" }} alt="Descripción de la imagen" />
            </div>
            <div style={{ background: "#164439", width: "100%", height: "633px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "443px", height: "105px" }}>
                    <Typography variant="h1" sx={{ fontSize: "2.5rem", marginBottom: "30px" }}>Atención personalizada</Typography>
                    <Typography variant="carrusel">Estamos aquí para asegurarnos de que tu experiencia con nosotros sea excepcional en cada paso del camino y <Typography variant="carrusel" sx={{ fontWeight: "600" }} >estamos comprometidos a superar tus expectativas.</Typography></Typography>
                    
                </div>
                <img src={atencionPersonalizada} style={{ width: "532px", height: "369px", borderTopRightRadius: "200px", borderBottomLeftRadius: "200px", marginLeft: "60px" }} alt="Descripción de la imagen" />
            </div> */}
        </div>
    );
};

export default CarouselItemListContainer;