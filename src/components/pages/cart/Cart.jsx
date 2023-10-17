import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const Cart = () => {
  const { cart, clearCart, deleteById, getTotalPrice } = useContext(CartContext);

  let total = getTotalPrice()

  return (
    <div>
      <h1>estoy en el carrito</h1>
      {
        cart.length > 0 && <Link to="/checkout" style={{color: "steelblue"}}>Finalizar compra</Link>
      }
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Imagen</TableCell>
            <TableCell align="left">Producto</TableCell>
            <TableCell align="left">Precio</TableCell>
            <TableCell align="left">Cantidad</TableCell>
            <TableCell align="left">Subtotal</TableCell>
            <TableCell align="left">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((product) => {
            return (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="left">
                  <img
                    src={product.image}
                    alt=""
                    style={{ width: "50px", height: "50px" }}
                  />
                </TableCell>
                <TableCell component="th" scope="row" align="left"> 
                  {product.title}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {product.unit_price}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {product.quantity}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  {product.quantity * product.unit_price}
                </TableCell>
                <TableCell component="th" scope="row" align="left">
                  <button onClick={() => deleteById(product.id)}>Eliminar</button>
                </TableCell>
              </TableRow>
            );
          })}
    <h5>El total a pagar es {total}</h5>
    <button onClick={clearCart}>Limpiar carrito</button>
        </TableBody>
      </Table>
    </div>
  );
};

export default Cart;
