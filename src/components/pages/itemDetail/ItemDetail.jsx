import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import { getDoc, collection, doc } from "firebase/firestore";
import { Box, Button, Card, Grid } from "@mui/material";
import { CartContext } from "../../../context/CartContext";

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
  };

  return (
    <div>
      <h1>detalle</h1>
      <Card sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              {product && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <img src={product.image} style={{ width: "500px"}} alt="" />
              </div>
              )}
            </Grid>
            <Grid item xs={12} sm={6} sx={{ p: 2 }}>
              {product && (
                <div>
                  <h4>Categoría: {product.category}</h4>
                  <h2>{product.title}</h2>
                  <h2>$ {product.unit_price}</h2>
                  <h3>{product.description}</h3>
                </div>
              )}
              {quantity && <h6>Ya tienes {quantity} en el carrito</h6>}
              {product?.stock === quantity && <h6>Ya tienes el máximo en el carrito</h6>}
              <div style={{ display: "flex" }}>
                <Button variant="contained" onClick={subOne}>-</Button>
                <h4>{counter}</h4>
                <Button variant="contained" onClick={addOne}>+</Button>
                <Button onClick={onAdd}>Agregar al carrito</Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
};

export default ItemDetail;
