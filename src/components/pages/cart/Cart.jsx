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

const Cart = () => {
  const { cart, clearCart, deleteById, getTotalPrice } = useContext(CartContext);

  let total = getTotalPrice()

  return (
    <div style={{ width: "100%", marginTop: "80px", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
        <ThemeProvider theme={theme}>
        <Typography variant="h4Custom">Compra/Carrito de compras</Typography>

        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", alignContent: "center", alignItems: "center", width: "685px", marginTop: "40px" }}>
          <Typography variant="titulo" sx={{ fontSize: "14px" }}>Productos</Typography>
          <img src={lineCart} style={{ width: '104px', height: '1px' }} alt="Descripción de la imagen" />
          <Typography variant="h4" style={{ color: "#164439" }} >Detalle de entrega</Typography>
          <img src={lineCart} style={{ width: '104px', height: '1px'}} alt="Descripción de la imagen" />
          <Typography variant="h4" style={{ color: "#164439" }} >Medios de pago</Typography>
        </div>
        <TableContainer component={Paper} sx={{ maxWidth: "685px", maxHeight: "415px", borderRadius: "3px", boxShadow: "3px 4px 11px 0px rgba(0, 0, 0, 0.10)", overflow: "auto", marginTop: "20px" }}>
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
                      <TableCell component="th" scope="row" align="left" sx={{ display: "flex", justifyContent: "center", }}>
                        <div style={{ position: 'relative' }}>
                          <img src={product.image} alt="" style={{ width: "67px", height: "68px", borderRadius: "2px" }}/>
                          <div style={{ position: 'absolute', bottom: '4.5px', left: '0', cursor: 'pointer', background: "#41A88A", width: "25px", height: "25px", }}>
                            <Icon onClick={() => deleteById(product.id)} icon="mdi:garbage" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: "#FFF", width: "14px", height: "14px", }}/>
                          </div>
                        </div>
                        <div style={{ width: "156px", marginLeft: "10px"}}>
                          <Typography variant="h4Custom" sx={{ fontSize: "13px" }}>{product.title}</Typography>
                        </div>
                      </TableCell>
                      <TableCell component="th" scope="row" align="left">
                        <div style={{ display: "flex", background: "#EEE", width: "88px", height: "36px", alignItems: "center", marginTop: "6px", marginRight: "20px" }}>
                          <Typography variant="h3Counter" style={{ background: "#FFF", width: "35.71px", height: "28.8px", lineHeight: "28.8px", textAlign: "center", marginLeft: "2.5px" }}>{product.quantity}</Typography>
                          <Typography style={{ color: "#9A9A9A", width: "28px", height: "36px", textAlign: "center", lineHeight: "36px" }} >-</Typography>
                          <Typography style={{ color: "#9A9A9A", width: "28px", height: "36px", textAlign: "center", lineHeight: "36px" }} >+</Typography>
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
          <div style={{ position: 'sticky', bottom: 0, padding: '10px', background: "#F8F8F8" }}>
            <Typography variant="stock" sx={{ background: "#FFF", width: "627px", height: "35px", display: "flex", alignItems: "center", color: "#000" }}>Subtotal (sin envío) ${total}</Typography>
              <button onClick={clearCart}>Limpiar carrito</button>
            </div>
          </TableContainer>
  
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "20px", width: "600px", marginBottom: "70px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              {cart.length > 0 && (
              <Link to="/shop" style={{ textDecoration: 'none' }}>
                <Icon icon="grommet-icons:next" transform="rotate(180)" width="14px" height="14px" />
                <Typography variant="stock" style={{ color: '#164439'}}>Seguir comprando</Typography> 
              </Link>
              )}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              {cart.length > 0 && (
              <Link to="/checkout" style={{ textDecoration: 'none' }}>
                <Typography variant="stock" style={{ color: '#164439' }}>Siguiente paso <Icon icon="grommet-icons:next" width="14px" height="14px" /></Typography>
              </Link>
              )}
          </div>
        </div>
        </ThemeProvider>
      </div>
  );
};

export default Cart;
