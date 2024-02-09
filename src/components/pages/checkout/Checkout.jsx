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
  const [preferenceId, setPreferenceId] = useState(undefined)
  console.log(import.meta.env.VITE_MP_PUBLIC_KEY)
  useEffect(()=>{
    initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, { locale: 'es-AR' });
  }, [])
  const { user } = useContext(AuthContext);
  
  const [orderId, setOrderId] = useState(null);

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

  const storedOrder = JSON.parse(localStorage.getItem("order"));

  const handleBuy = async () => {
    const storedOrder = JSON.parse(localStorage.getItem("order"));
    const address = {
      street_name: storedOrder.street_name,
      street_number: storedOrder.street_number,
      apartment: storedOrder.apartment ? storedOrder.apartment : false,
      aditional_info: storedOrder.aditional_info ? storedOrder.aditional_info : false,
      zip_code: storedOrder.zip_code
    }
    const phone = {
      area_code: storedOrder.area_code,
      number: storedOrder.phone
    }
    
    let orderData = [];
    cart.map(element=>{
      orderData.push({id:element.productId, quantity:element.productQuantity})
    })
   

    let userTokenAccess = localStorage.getItem('userTokenAccess');
    const url = 'https://naturalicy-back-production.up.railway.app/api/checkout/createPreference';

    let fetchOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (userTokenAccess) {
        fetchOptions.headers['Authorization'] = `Bearer ${userTokenAccess}`;
    }
    
    axios.post(url, {orderData, address, phone}, fetchOptions)
    .then(res=>{
      console.log(res)
      setPreferenceId(res.data.id)
    })
    .catch(error=>console.log(error))

  };


  return (
    <div className="checkoutContainer">
      {
        !orderId ? <>
          <ThemeProvider theme={theme}>
            <div className="checkoutBox">
              <div className="principalCheckout">
                <img src={natural} alt="Nombre del emprendimiento: Natural" style={{marginBottom:'.5em'}} className="checkoutImg" />
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
                    <Typography variant="h4Custom" ><b style={{fontWeight:'500'}}>Nombre:</b> {storedOrder.name}</Typography>
                  </div>

                  <div className="detailInfoCheckout">
                    <Typography variant="h4Custom"><b style={{fontWeight:'500'}}>Apellido: </b>{storedOrder.last_name}</Typography>
                  </div>

                  <div className="detailInfoCheckout">
                    <Typography variant="h4Custom"><b style={{fontWeight:'500'}}>Email: </b>{storedOrder.email}</Typography>
                  </div>

                  <div className="detailInfoCheckout">
                    <Typography variant="h4Custom"><b style={{fontWeight:'500'}}>Teléfono: </b>{storedOrder.area_code}{storedOrder.phone}</Typography>
                  </div>

                  <div className="detailInfoCheckout">
                    <Typography variant="h4Custom"><b style={{fontWeight:'500'}}>Calle: </b>{storedOrder.street_name}</Typography>
                  </div>

                  <div className="detailInfoCheckout">
                    <Typography variant="h4Custom"><b style={{fontWeight:'500'}}>Número: </b>{storedOrder.street_number}</Typography>
                  </div>

                  {
                    storedOrder.apartment ? (
                      <div className="detailInfoCheckout">
                        <Typography variant="h4Custom" sx={{ marginBottom: "1rem" }}><b style={{fontWeight:'500'}}>Observaciones: </b>{storedOrder.apartment}</Typography>
                      </div>
                    )
                    : ('')
                  }

                  <div className="detailInfoCheckout">
                    <Typography variant="h4Custom"><b style={{fontWeight:'500'}}>Código postal: </b>{storedOrder.zip_code}</Typography>
                  </div>

                  {
                    storedOrder.aditional_info ? (
                      <div className="detailInfoCheckout">
                        <p variant="h4Custom" sx={{ marginBottom: "1rem" }} style={{overflowWrap:'anywhere'}}><b style={{fontWeight:'500'}}>Observaciones: </b>{storedOrder.aditional_info}</p>
                      </div>
                    )
                    : ('')
                  }
                </div>
                <div>
                  <CartCheckout />
                </div>
              </div>
            </div>
            <Button onClick={handleBuy}>Generar medios de pago</Button>
            {
              preferenceId &&
              <div>
                <Wallet initialization={{preferenceId: preferenceId}} />
              </div>
            }
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
