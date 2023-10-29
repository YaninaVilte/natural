import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let refCollection = collection(db, "products");
    getDocs(refCollection)
      .then((res) => {
        let newArray = res.docs.map((product) => {
          return { ...product.data(), id: product.id };
        });

        setProducts(newArray);
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <div>
      <h1>Estoy en el shop</h1>
      <Box sx={{ mt: 2, mx: 3 }}>
        <Grid container spacing={2} direction="row" sx={{ mt: 2}}>
      {products.map((product) => {
        return (
          
          <Grid key={product.id} item
            xs={4} sm={3} md={2}>
              <Link to={`/itemDetail/${product.id}`}>
            <Card sx={{ maxWidth: 250 }}>
              <CardActionArea sx={{ mt: 2, mx: 0, my: 0 }}>
                <CardMedia component="img" src={product.image} alt=""/>
                  <CardContent>
                    <Typography>
                      {product.title}
                    </Typography>
                      <Typography>
                        $ {product.unit_price}
                      </Typography>
                      <Typography>
                        Stock {product.stock}
                      </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              </Link>
              </Grid>
            
          
        );
      })}
      </Grid>
      </Box>
      
    </div>
  );
};

export default ItemListContainer;
