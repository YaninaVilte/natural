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
import ResponsiveCart from "./ResponsiveCart";

const Cart = () => {
  const { cart, clearCart, deleteById, getTotalPrice } = useContext(CartContext);

  let total = getTotalPrice()

  return (
    <div>
        <ThemeProvider theme={theme}>
        <div className="cart">
        <Typography variant="h4Custom">Compra/Carrito de compras</Typography>

        <div className="cartStatus">
          <Typography variant="titulo" sx={{ fontSize: "14px" }}>Productos</Typography>
          <img src={lineCart} className="cartLine" alt="Linea recta" />
          <Typography variant="h4" style={{ color: "#164439" }} >Detalle de entrega</Typography>
          <img src={lineCart} className="cartLine" alt="Linea recta" />
          <Typography variant="h4" style={{ color: "#164439" }} >Medios de pago</Typography>
        </div>

        <TableContainer component={Paper} className="tableContainer">
          <Table stickyHeader sx={{ }} aria-label="simple table">
              <TableHead sx={{}} >
              <TableRow sx={{ }}>
                <TableCell align="left" sx={{ background: "#F8F8F8" }}><Typography variant="h2Custom" sx={{fontWeight: "700" }}>Producto</Typography></TableCell>
                <TableCell align="left" sx={{ background: "#F8F8F8" }}><Typography variant="h2Custom" sx={{ fontWeight: "700" }}>Cantidad</Typography></TableCell>
                <TableCell align="left" sx={{ background: "#F8F8F8" }}><Typography variant="h2Custom" sx={{ fontWeight: "700" }}>Precio</Typography></TableCell>
                <TableCell align="left" sx={{ background: "#F8F8F8" }}><Typography variant="h2Custom" sx={{ fontWeight: "700" }}>Subtotal</Typography></TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((product) => {
                  return (
                    <TableRow key={product.id} sx={{ "&:last-child td, &:last-child th": { border: 0 }, background: "#F8F8F8" }}>
                      <TableCell component="th" scope="row" align="left" sx={{ display: "flex", justifyContent: "start", }}>
                        <div className="productContainer">
                          <img src={product.image} alt="Imagen del producto"/>
                          <div className="deleteProductContainer">
                            <Icon onClick={() => deleteById(product.id)} icon="mdi:garbage"/>
                          </div>
                        </div>
                        <div className="titleProductContainer">
                          <Typography variant="h4Custom" sx={{ fontSize: "13px" }}>{product.title}</Typography>
                        </div>
                      </TableCell>
                      <TableCell component="th" scope="row" align="left">
                        <div className="quantityContainer">
                          <Typography variant="h3Counter" className="quantity">{product.quantity}</Typography>
                          <Typography className="quantitySubAdd">-</Typography>
                          <Typography className="quantitySubAdd">+</Typography>
                        </div>
                      </TableCell>
                      <TableCell component="th" scope="row" align="left">$
                        <Typography variant="h4Custom" sx={{ lineHeight: "112%" }}>{product.unit_price}</Typography>
                      </TableCell>
                      <TableCell component="th" scope="row" align="left">$
                        <Typography variant="h4Custom" sx={{ fontWeight: "500", lineHeight: "112%" }}>{product.quantity * product.unit_price}</Typography>
                      </TableCell>
                    </TableRow>
                    );
                })}
              </TableBody>
            </Table >
          <div className="subTotalContainer">
            <Typography variant="stock" className="subTotal">Subtotal (sin envío) ${total}</Typography>
              <button onClick={clearCart}>Limpiar carrito</button>
            </div>
          </TableContainer>
        <div className="optionsContainer">
              {cart.length > 0 && (
              <Link to="/shop" className="linksOptions">
                <Icon icon="grommet-icons:next" transform="rotate(180)"/>
                <Typography variant="stock" style={{ color: '#164439'}}>Seguir comprando</Typography> 
              </Link>
              )}
              {cart.length > 0 && (
              <Link to="/checkout" className="linksOptions">
                <Typography variant="stock" style={{ color: '#164439' }}>Siguiente paso <Icon icon="grommet-icons:next"/></Typography>
              </Link>
              )}
        </div>
        </div>
        <div className="responsiveCart">
          <ResponsiveCart />
        </div>

        </ThemeProvider>
      </div>
  );
};

export default Cart;
