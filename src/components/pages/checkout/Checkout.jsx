import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { Button, Typography } from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import natural from "../../../assets/natural.png"
import lineCart from "../../../assets/lineCart.png"
import { Icon } from '@iconify/react';


const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  initMercadoPago(import.meta.env.VITE_PUBLICKEY, {
    locale: "es-AR",
  });
  const [preferenceId, setPreferenceId] = useState(null);
  const [userData, setUserData] = useState({
    cp: "",
    phone: "",
  });
  const [orderId, setOrderId] = useState(null);
  const [shipmentCost, setShipmentCost] = useState(0)

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get("status"); // approved --- reject

  useEffect(() => {
    // ACA ES DONDE GUARDAMOS LA ORDEN EN FIREBASE
    // CONDICIONADO A QUE YA ESTE EL PAGO REALIZADO
    let order = JSON.parse(localStorage.getItem("order"));
    if (paramValue === "approved") {
      let ordersCollection = collection(db, "orders");
      addDoc(ordersCollection, { ...order, date: serverTimestamp() }).then(
        (res) => {
          setOrderId(res.id);
        }
      );

      order.items.forEach((elemento) => {
        updateDoc(doc(db, "products", elemento.id), {
          stock: elemento.stock - elemento.quantity,
        });
      });

      localStorage.removeItem("order");
      clearCart()
    }
  }, [paramValue]);

  useEffect(() => {
    let shipmentCollection = collection(db, "shipment")
    let shipmentDoc = doc(shipmentCollection, "lXy4L7rWxnuFKqPoisQW")
    getDoc(shipmentDoc).then(res => {
      setShipmentCost(res.data().cost)
    })
  }, [])


  let total = getTotalPrice();

  const createPreference = async () => {
    const newArray = cart.map((product) => {
      return {
        title: product.title,
        unit_price: product.unit_price,
        quantity: product.quantity,
      };
    });
    try {
      let response = await axios.post(
        "https://back-prueba-kdt33t5ey-yaninavilte.vercel.app/create_preference",
        {
          items: newArray,
          shipment_cost: shipmentCost,
        }
      );

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };


  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let contactDetails = JSON.parse(localStorage.getItem("order"));
    setUserData({
      name: contactDetails.name,
      last_name: contactDetails.last_name,
      email: contactDetails.email,
      phone: contactDetails.phone,
      street: contactDetails.street,
      street_number: contactDetails.street_number,
      department: contactDetails.department,
      cp: contactDetails.cp,
      observations: contactDetails.observations,
    });
  }, [paramValue]);


  const handleBuy = async () => {
    let contactDetails = JSON.parse(localStorage.getItem("order"));
    let order = {
      items: cart,
      total: total + shipmentCost,
      email: user.email,
    };
    localStorage.setItem("order", JSON.stringify(order));
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };





  return (
    <div>
      {
        !orderId ? <>
          <ThemeProvider theme={theme}>
            <div className="checkoutContainer">
              <img src={natural} alt="Nombre del emprendimiento: Natural" className="checkoutImg" />
              <Typography variant="h2">Compra más rápido y lleva el control de tus pedidos, ¡en un solo lugar!</Typography>
              <div className="cartStatus">
                <Typography variant="h4" style={{ color: "#164439" }}>Productos</Typography>
                <img src={lineCart} className="cartLine" alt="Linea recta" />
                <Typography variant="h4" style={{ color: "#164439" }} >Detalle de entrega</Typography>
                <img src={lineCart} className="cartLine" alt="Linea recta" />
                <Typography variant="titulo" sx={{ fontSize: "0.875rem" }} >Medios de pago</Typography>
              </div>
              <Typography variant="h4" style={{ color: "#164439" }}>
                Datos sobre el envío:
              </Typography>
              <Typography variant="body1">
                Nombre: {userData.name}
              </Typography>
              <Typography variant="body1">
                Apellido: {userData.last_name}
              </Typography>
              <Typography variant="body1">
                Email: {userData.email}
              </Typography>
              <Typography variant="body1">
                Teléfono: {userData.phone}
              </Typography>
              <Typography variant="body1">
                Calle: {userData.street}
              </Typography>
              <Typography variant="body1">
                Número: {userData.street_number}
              </Typography>
              <Typography variant="body1">
                Departamento: {userData.department}
              </Typography>
              <Typography variant="body1">
                Código postal: {userData.cp}
              </Typography>
              <Typography variant="body1">
                Observaciones: {userData.observations}
              </Typography>
              <Button onClick={handleBuy}>Seleccione metodo de pago</Button>
            </div>
          </ThemeProvider>
        </> : <>
          <h4>El pago se realizo con exito</h4>
          <h4>Su numero de compra es {orderId}</h4>
          <Link to="/shop">Seguir comprando</Link>
        </>
      }

      {preferenceId && (
        <Wallet initialization={{ preferenceId, redirectMode: "self" }} />
      )}
    </div>
  );
};

export default Checkout;