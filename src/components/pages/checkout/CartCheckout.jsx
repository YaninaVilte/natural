import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

const CartCheckout = () => {
    const { cart, getTotalPrice } = useContext(CartContext);

    let total = getTotalPrice()

    return (
        <div className="cartCheckout">
            <ThemeProvider theme={theme}>
                <TableContainer component={Paper} className="tablecartCheckout">
                    <Table stickyHeader aria-label="simple table">
                        <TableHead >
                            <TableRow>
                                <TableCell align="left" sx={{ background: "#F8F8F8" }}><Typography variant="h2Custom" sx={{ fontWeight: "700" }}>Detalle de compra</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart.map((product) => {
                                return (
                                    <TableRow key={product.id} sx={{ "&:last-child td, &:last-child th": { border: 0 }, background: "#F8F8F8" }}>
                                        <TableCell component="th" scope="row" align="left" sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                                            <div className="productContainerCartCheckout">
                                                <img src={product.image} alt="Imagen del producto" />
                                            </div>

                                            <div className="detailProductContainerCheckout">
                                                <Typography variant="h4Custom" sx={{ fontWeight: "500", lineHeight: "112%" }}>{product.title}</Typography>
                                                <Typography variant="h4Custom" sx={{ fontWeight: "500", lineHeight: "112%" }}>${product.quantity * product.unit_price}</Typography>
                                                <Typography variant="h4Custom" sx={{ fontSize: "0.813rem" }}>Cantidad: {product.quantity}</Typography>
                                                <Typography variant="h4Custom" sx={{ fontSize: "0.813rem" }}>Precio unitario: ${product.unit_price}</Typography>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table >
                    <div className="subTotalCartCheckut">
                        <Typography variant="stock" className="subTotal">Total (sin envío) ${total}</Typography>
                    </div>
                </TableContainer>
            </ThemeProvider>
        </div>
    );
};

export default CartCheckout;