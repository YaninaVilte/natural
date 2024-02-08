import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { Button, Typography } from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { addDoc, collection, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import natural from "../../../assets/natural.png"
import lineCart from "../../../assets/lineCart.png"
import CartCheckout from "./CartCheckout";


const Checkout = () => {

  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  initMercadoPago(import.meta.env.VITE_PUBLICKEY, {
    locale: "es-AR",
  });
  const [preferenceId, setPreferenceId] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [shipmentCost, setShipmentCost] = useState(0)

//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const paramValue = queryParams.get("status"); // approved --- reject

//   useEffect(() => {
//     // ACA ES DONDE GUARDAMOS LA ORDEN EN FIREBASE
//     // CONDICIONADO A QUE YA ESTE EL PAGO REALIZADO
//     let order = JSON.parse(localStorage.getItem("order"));
//     if (paramValue === "approved") {
//       let ordersCollection = collection(db, "orders");
//       addDoc(ordersCollection, { ...order, date: serverTimestamp() }).then(
//         (res) => {
//           setOrderId(res.id);
//         }
//       );

//       order.items.forEach((elemento) => {
//         updateDoc(doc(db, "products", elemento.id), {
//           stock: elemento.stock - elemento.quantity,
//         });
//       });

//       localStorage.removeItem("order");
//       clearCart()
//     }
//   }, [paramValue]);

  useEffect(() => {
    let shipmentCollection = collection(db, "shipment")
    let shipmentDoc = doc(shipmentCollection, "lXy4L7rWxnuFKqPoisQW")
    getDoc(shipmentDoc).then(res => {
      setShipmentCost(res.data().cost)
    })
  }, [])


//   let total = getTotalPrice();

//   const createPreference = async () => {
//     const newArray = cart.map((product) => {
//       return {
//         title: product.title,
//         unit_price: product.unit_price,
//         quantity: product.quantity,
//       };
//     });
//     try {
//       let response = await axios.post(
//         "https://back-prueba-kdt33t5ey-yaninavilte.vercel.app/create_preference",
//         {
//           items: newArray,
//           shipment_cost: shipmentCost,
//         }
//       );

//       const { id } = response.data;
//       return id;
//     } catch (error) {
//       console.log(error);
//     }
//   };


  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const storedOrder = JSON.parse(localStorage.getItem("order"));

  const handleBuy = async () => {
    const storedOrder = JSON.parse(localStorage.getItem("order"));
    console.log("Order Details from localStorage:", storedOrder);
    const order = {
      ...storedOrder,
      items: cart,
      total: total,
      // email: user.email,
    };
    localStorage.setItem("order", JSON.stringify(order));
    console.log("Updated Order Details:", order);
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };


  return (
    <div className="checkoutContainer">
      {
        !orderId ? <>
          <ThemeProvider theme={theme}>
            <div className="checkoutBox">
              <div className="principalCheckout">
                <img src={natural} alt="Nombre del emprendimiento: Natural" className="checkoutImg" />
                <Typography variant="h2">Compra más rápido y lleva el control de tus pedidos, ¡en un solo lugar!</Typography>
              </div>
              <div className="cartStatusCheckout">
                <Typography variant="h4" style={{ color: "#164439", alignItems:"center" }}>Productos</Typography>
                <img src={lineCart} className="cartLine" alt="Linea recta" />
                <Typography variant="h4" style={{ color: "#164439" }} >Detalle de entrega</Typography>
                <img src={lineCart} className="cartLine" alt="Linea recta" />
                <Typography variant="titulo" sx={{ fontSize: "0.875rem" }} >Medios de pago</Typography>
              </div>
              <div className="infoCheckoutContainer">
                <div className="infoCheckout">
                  <Typography variant="h2Custom" sx={{ fontWeight: "700", borderBottom: "1px solid rgba(224, 224, 224, 1)", padding: "1rem" }}>Datos sobre el envío:</Typography>


                  <div className="detailInfoCheckout">
                    <Typography variant="h4Custom" sx={{ fontWeight: "500", lineHeight: "112%" }}>Nombre: </Typography>
                    <Typography variant="h4Custom" sx={{ fontSize: "0.813rem" }}>{storedOrder.name}</Typography>
                  </div>

                  <div className="detailInfoCheckout">
                    <Typography variant="h4Custom" sx={{ fontWeight: "500", lineHeight: "112%" }}>Apellido: </Typography>
                    <Typography variant="h4Custom" sx={{ fontSize: "0.813rem" }}>{storedOrder.last_name}</Typography>
                  </div>

                  <div className="detailInfoCheckout">
                    <Typography variant="h4Custom" sx={{ fontWeight: "500", lineHeight: "112%" }}>Email: </Typography>
                    <Typography variant="h4Custom" sx={{ fontSize: "0.813rem" }}>{storedOrder.email}</Typography>
                  </div>

                  <div className="detailInfoCheckout">
                    <Typography variant="h4Custom" sx={{ fontWeight: "500", lineHeight: "112%" }}>Teléfono: </Typography>
                    <Typography variant="h4Custom" sx={{ fontSize: "0.813rem" }}>{storedOrder.phone}</Typography>
                  </div>

                  <div className="detailInfoCheckout">
                    <Typography variant="h4Custom" sx={{ fontWeight: "500", lineHeight: "112%" }}>Calle: </Typography>
                    <Typography variant="h4Custom" sx={{ fontSize: "0.813rem" }}>{storedOrder.street_name}</Typography>
                  </div>

                  <div className="detailInfoCheckout">
                    <Typography variant="h4Custom" sx={{ fontWeight: "500", lineHeight: "112%" }}>Número: </Typography>
                    <Typography variant="h4Custom" sx={{ fontSize: "0.813rem" }}>{storedOrder.street_number}</Typography>
                  </div>

                  <div className="detailInfoCheckout">
                    <Typography variant="h4Custom" sx={{ fontWeight: "500", lineHeight: "112%" }}>Departamento: </Typography>
                    <Typography variant="h4Custom" sx={{ fontSize: "0.813rem" }}>{storedOrder.apartment}</Typography>
                  </div>

                  <div className="detailInfoCheckout">
                    <Typography variant="h4Custom" sx={{ fontWeight: "500", lineHeight: "112%" }}>Código postal: </Typography>
                    <Typography variant="h4Custom" sx={{ fontSize: "0.813rem" }}>{storedOrder.zip_code}</Typography>
                  </div>

                  <div className="detailInfoCheckout">
                    <Typography variant="h4Custom" sx={{ marginBottom: "1rem", fontWeight: "500", lineHeight: "112%" }}>Observaciones: </Typography>
                    <Typography variant="h4Custom" sx={{ fontSize: "0.813rem" }}>{storedOrder.aditional_info}</Typography>
                  </div>
                </div>
                <div>
                  <CartCheckout />
                </div>
              </div>
            </div>
            <Button onClick={handleBuy}>Seleccione metodo de pago</Button>
          </ThemeProvider>
        </> : <>
          <h4>El pago se realizo con exito</h4>
          <h4>Su numero de compra es {orderId}</h4>
          <Link to="/shop">Seguir comprando</Link>
        </>
      }

{/* //       {preferenceId && (
//         <Wallet initialization={{ preferenceId, redirectMode: "self" }} />
//       )} */}
    </div>
  );
};


export default Checkout;
