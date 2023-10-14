import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, clearCart, deleteById, getTotalPrice } = useContext(CartContext);

  let total = getTotalPrice()

  return (
    <div>
      <h1>estoy en el carrito</h1>
      {
        cart.length > 0 && <Link to="/checkout" style={{color: "steelblue"}}>Finalizar compra</Link>
      }
      {cart.map((product) => {
        return (
          <div key={product.id} style={{width: "200px", border: "2px solid red"}}>
            <h6><small>Producto </small> {product.title}</h6>
            <h6><small>Precio </small>${product.unit_price}</h6>
            <h6><small>Cantidad </small>{product.quantity}</h6>
            <h6><small>Subtotal </small>${product.quantity * product.unit_price}</h6>
            <button onClick={()=>deleteById(product.id)}>Eliminar</button>
          </div>
        );
      })}
      <h5>El total a pagar es {total}</h5>
      <button onClick={clearCart}>Limpiar carrito</button>
    </div>
  );
};

export default Cart;
