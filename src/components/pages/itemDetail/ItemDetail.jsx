import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { getDoc, collection, doc } from "firebase/firestore";
import { Box, Button, Grid, CardMedia, Typography, ThemeProvider } from "@mui/material";
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
  <div style={{ width: "329px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
    <Icon icon={icon} width="80" height="80" color="#164439" />
    <br />
    <Typography variant="serviceBold">{title}</Typography>
    <br />
    <Typography variant="service">{subtitle}</Typography>
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
        <div style={{ width: "100%", display: "flex", justifyContent: "center", background: "#164439" }}>
        <div>
        <Box sx={{ display: 'flex', justifyContent: "center" }}>
              <Grid container sx={{ display: 'flex', justifyContent: "center", alignItems: "center", background: "#164439", width: "1440px", height: "612px" }}>
            <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {product && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: "#FFF", borderTopRightRadius: "200px", borderBottomLeftRadius: "200px", width: "599px", height: "466px" }}>
                  <CardMedia component="img" src={product.image} alt="" sx={{ width: "487px", height: "301px" }} />
                </div>
              )}
            </Grid>
            <Grid item xs={12} sm={6} sx={{ p: 2 }}>
              {product && (
                <div style={{ marginBottom: "80px" }}>
                  <h4>Categoría: {product.category}</h4>
                  <Typography variant="h1" style={{ width: "380px", height: "83px", marginBottom: "50px" }}>{product.title}</Typography>
                      <Typography variant="h2Description" sx={{ display: 'block', mb: 1, marginBottom: "15px", width: "380px", height: "83px" }} >{product.description}</Typography>
                  <Typography variant="h1Custom">${product.unit_price}</Typography>
                </div>
              )}

              {product?.stock === quantity && <h6>Ya tienes el máximo en el carrito</h6>}

              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <div>
                    {product?.stock === 0 && <Typography variant="stock" style={{
                      display: 'flex',
                      width: '88px',
                      height: '20px',
                      justifyContent: 'center',
                      background: '#FFFF66',
                    }} > Sin stock </Typography>}
                    {product?.stock >= 1 && product?.stock <= 5 && <Typography variant="stock" style={{
                      display: 'flex',
                      width: '120px',
                      height: '20px',
                      justifyContent: 'center',
                      background: '#FFFF66',
                    }}>Pocas unidades</Typography>}
                    {product?.stock >= 6 && <Typography variant="stock" style={{
                      display: 'flex',
                      width: '88px',
                      height: '20px',
                      justifyContent: 'center',
                      background: '#FFFF66',
                    }}> En stock </Typography>}
                  </div>
                  <div style={{ display: "flex", background: "#EEE", width: "88px", height: "36px", alignItems: "center", marginTop: "6px", marginRight: "20px" }}>
                    <Typography variant="h3Counter" style={{ background: "#FFF", width: "35.71px", height: "28.8px", lineHeight: "28.8px", textAlign: "center", marginLeft: "2.5px" }}>{counter}</Typography>
                    <Typography style={{ color: "#9A9A9A", width: "28px", height: "36px", textAlign: "center", lineHeight: "36px" }} onClick={subOne}>-</Typography>
                    <Typography style={{ color: "#9A9A9A", width: "28px", height: "36px", textAlign: "center", lineHeight: "36px" }} onClick={addOne}>+</Typography>
                  </div>
                </div>
                <div>
                    <ButtonBuy
                      variant="contained"
                      disableRipple
                      onClick={onAdd}
                    >
                      <Typography variant="h4">
                        Agregar al carrito
                        </Typography><Box m={0.3} />
                      <Icon icon="fontisto:shopping-basket" />
                    </ButtonBuy>

                </div>
              </div>

            </Grid>
          </Grid>
        </Box>
      </div>
      </div>
      

      <div style={{ width: "100%", height: "240px", background: "#F8F8F8", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        <Service icon="ic:baseline-delivery-dining" title="Envíos" subtitle="Express" />
        <Service icon="material-symbols:store" title="Productos" subtitle="seleccionados" />
        <Service icon="ic:twotone-support-agent" title="Atención" subtitle="personalizada" />
      </div>


    </ThemeProvider>
    </div>
  );
};

export default ItemDetail;