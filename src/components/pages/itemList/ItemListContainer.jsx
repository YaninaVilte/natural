import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import { RotatingTriangles } from  'react-loader-spinner'

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


  if (products.length === 0) {
    return (
      <div style={{
        width: "100%",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
            }}>
      <RotatingTriangles
        visible={true}
        ariaLabel="rotating-triangels-loading"
        wrapperClass="rotating-triangels-wrapper"
        colors={['#51E5FF', '#7DE2D1', '#FF7E6B']}
        
      />
    </div>
    
    );
}


  return (
    <div>
      <h1>Estoy en el shop</h1>
      <Box sx={{ mt: 2, mx: 3 }}>
        <Grid container spacing={2} direction="row" sx={{ mt: 2}}>
      {products.map((product) => {
        return (
          <Grid key={product.id} item
            lg={2} md={3} sm={4} xs={6}>
              <Link to={`/itemDetail/${product.id}`}>
            <Card sx={{ maxWidth: 250 }}>
              <CardActionArea sx={{ mt: 2, mx: 0, my: 0 }}>
                <CardMedia component="img" src={product.image} alt=""/>
                  <CardContent>
                    <ThemeProvider theme={theme}>
                      <Typography variant="h3">
                      {product.title}
                    </Typography>
                    </ThemeProvider>
                    
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