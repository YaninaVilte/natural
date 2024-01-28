import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import lineCart from "../../../assets/lineCart.png"
import { Icon } from '@iconify/react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";


const ResponsiveCart = () => {
    const { cart, clearCart, deleteById, getTotalPrice } = useContext(CartContext);

    let total = getTotalPrice()

    return (
        <div className="cartResponsive">
            <ThemeProvider theme={theme}>
                <Typography variant="h4Custom">Compra/Carrito de compras</Typography>

                <div className="cartStatusResponsive">
                    <Typography variant="titulo" sx={{ fontSize: "0.875rem" }}>Productos</Typography>
                    <img src={lineCart} className="cartLineResponsive" alt="Linea recta" />
                    <Typography variant="h4" style={{ color: "#164439" }} >Detalle de entrega</Typography>
                    <img src={lineCart} className="cartLineResponsive" alt="Linea recta" />
                    <Typography variant="h4" style={{ color: "#164439" }} >Medios de pago</Typography>
                </div>

                <TableContainer component={Paper} className="tableContainerResponsive">
                    <Table stickyHeader aria-label="simple table">
                        <TableHead >
                            <TableRow>
                                <TableCell align="left" sx={{ background: "#F8F8F8" }}><Typography variant="h2Custom" sx={{ fontWeight: "700" }}>Detalle del producto</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart.map((product) => {
                                return (
                                    <TableRow key={product.id} sx={{ "&:last-child td, &:last-child th": { border: 0 }, background: "#F8F8F8" }}>
                                        <TableCell component="th" scope="row" align="left" sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                                            <div className="productContainerResponsive">
                                                <img src={product.image} alt="Imagen del producto" />
                                                <div className="deleteProductContainerResponsive">
                                                    <Icon onClick={() => deleteById(product.id)} icon="mdi:garbage" />
                                                </div>
                                            </div>

                                            <div className="detailProductContainerResponsive">
                                                <Typography variant="h4Custom" sx={{ fontSize: "0.813rem" }}>{product.title}</Typography>

                                                <div className="quantityPriceContainerResponsive">
                                                <div className="quantityContainerResponsive">
                                                    <Typography variant="h3Counter" className="quantityResponsive">{product.quantity}</Typography>
                                                    <Typography className="quantitySubAddResponsive">-</Typography>
                                                    <Typography className="quantitySubAddResponsive">+</Typography>
                                                </div>

                                                <Typography variant="h4Custom" sx={{ fontWeight: "500", lineHeight: "112%" }}>${product.quantity * product.unit_price}</Typography>
                                            </div>

                                            

                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table >
                    <div className="subTotalContainerResponsive">
                        <Typography variant="stock" className="subTotal">Subtotal (sin envío) ${total}</Typography>
                        <h5 onClick={clearCart}>Limpiar carrito</h5>
                    </div>
                </TableContainer>
                <div className="optionsContainerResponsive">
                    {cart.length > 0 && (
                        <Link to="/shop" className="linksOptionsResponsive">
                            <Icon icon="grommet-icons:next" transform="rotate(180)" />
                            <Typography variant="stock" style={{ color: '#164439' }}>Seguir comprando</Typography>
                        </Link>
                    )}
                    {cart.length > 0 && (
                        <Link to="/checkout" className="linksOptionsResponsive">
                            <Typography variant="stock" style={{ color: '#164439' }}>Siguiente paso <Icon icon="grommet-icons:next" /></Typography>
                        </Link>
                    )}
                </div>
            </ThemeProvider>
        </div>
    );
};


export default ResponsiveCart;
