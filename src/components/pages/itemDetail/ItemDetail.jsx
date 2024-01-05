import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { getDoc, collection, doc } from "firebase/firestore";
import { Box, Button, CardMedia, Typography, ThemeProvider } from "@mui/material";
import { CartContext } from "../../../context/CartContext";
import { Icon } from '@iconify/react';
import theme from "../../../temaConfig";
import { styled } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ButtonBuy = styled(Button)({
  boxShadow: 'none',
  borderRadius: "2px",
  textTransform: 'none',
  width: "261px",
  height: "63px",
  backgroundColor: '#41A88A',
  marginLeft: "5px",
  '&:hover': {
    boxShadow: 'none',
    backgroundColor: '#41A88A',
    textAlign: 'center',
    '& svg': {
      color: '#FFF)',
    },
    '& .MuiTypography-root': {
      color: '#FFF',
      textShadow: '0px 1px 0px rgba(0, 0, 0, 0.25)',
      fontStyle: 'italic',
      fontFamily: "Hagrid Trial",
      fontSize: "15px",
    },
  },
});


const Service = ({ icon, title, subtitle }) => (
  <div className="service">
    <Icon icon={icon}/>
    <Typography variant="serviceBold" className="serviceBold">{title}</Typography>
    <Typography variant="service" className="service">{subtitle}</Typography>
  </div>
);

const ItemDetail = () => {
  const { id } = useParams();
  const { addToCart, getQuantityById } = useContext(CartContext);
  let quantity = getQuantityById(id);
  const [product, setProduct] = useState(null);
  const [counter, setCounter] = useState(quantity || 1);


  useEffect(() => {
    let refCollection = collection(db, "products");
    let refDoc = doc(refCollection, id);
    getDoc(refDoc)
      .then((res) => setProduct({ ...res.data(), id: res.id }))
      .catch((error) => console.log(error));
  }, [id]);

  // SUMAR
  const addOne = () => {
    if (counter < product.stock) {
      setCounter(counter + 1);
    } else {
      alert("stock maximo");
    }
  };

  // RESTAR

  const subOne = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    } else {
      alert("no podes agregar menos de 1 elemento al carrito");
    }
  };
  // AGREGAR AL CARRITO

  const onAdd = () => {
    let obj = {
      ...product,
      quantity: counter,
    };
    addToCart(obj);

    toast("¡Su producto fue agregado con éxito!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div >
      <ThemeProvider theme={theme}>
        <ToastContainer />
      <h1>detalle</h1>
        <div className="itemDetailContainer">
              {product && (
            <div className="imgContainer">
                  <CardMedia component="img" src={product.image} alt="Imagen del producto seleccionado"/>
                </div>
              )}
            <div>
              {product && (
              <div className="itemDetail">
                  <h4>Categoría: {product.category}</h4>
                <Typography variant="h1" className="titleDetail">{product.title}</Typography>
                <Typography variant="h2Description" className="descriptionDetail" >{product.description}</Typography>
                  <Typography variant="h1Custom">${product.unit_price}</Typography>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "row" }}className="stockCounterButtonContainer">
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}} >
                <div className="stockItemDetail" >
                    {product?.stock === 0 && <Typography variant="stock" > Sin stock </Typography>}
                    {product?.stock >= 1 && product?.stock <= 5 && <Typography variant="stock">Pocas unidades</Typography>}
                    {product?.stock >= 6 && <Typography variant="stock"> En stock </Typography>}
                </div>
                <div className="counterItemDetail">
                  <Typography variant="h3Counter">{counter}</Typography>
                  <Typography className="subAddOne" onClick={subOne}>-</Typography>
                  <Typography className="subAddOne" onClick={addOne}>+</Typography>
                </div>
              </div>
                <div >
                    <ButtonBuy variant="contained" disableRipple onClick={onAdd} className="buttonDetail">
                      <Typography variant="h4">Agregar al carrito</Typography><Box m={0.3} />
                      <Icon icon="fontisto:shopping-basket" />
                    </ButtonBuy>
                </div>
              </div>
            </div>
      </div>
      

        <div className="serviceContainer">
        <Service icon="ic:baseline-delivery-dining" title="Envíos" subtitle="Express" />
        <Service icon="material-symbols:store" title="Productos" subtitle="seleccionados" />
        <Service icon="ic:twotone-support-agent" title="Atención" subtitle="personalizada" />
      </div>


    </ThemeProvider>
    </div>
  );
};

export default ItemDetail;