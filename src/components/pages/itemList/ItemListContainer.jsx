import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import { RotatingTriangles } from  'react-loader-spinner'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: '11px',
  padding: '6px 12px',
  border: '1px solid',
  backgroundColor: '#164439',
  borderColor: '#164439',
  color: ' #FFF',
  fontFamily: [
    'Hagrid Trial',
  ].join(','),
  '&:hover': {
    backgroundColor: '#164439',
    borderColor: '#164439',
    boxShadow: 'none',
    // On click
    // Change to: "Variant3";
    // Animate: Smart animate;
    animationName: 'yourAnimationName', // Nombre de la animación
    animationTimingFunction: 'linear',
    animationDuration: '200ms',
    color: '#41A88A',
    textAlign: 'center',
    textShadow: '1px 1px 0px rgba(0, 0, 0, 0.25)',
    fontFamily: 'Hagrid Trial',
    fontSize: '12px',
    fontStyle: 'italic',
    fontWeight: 400,
    lineHeight: 'normal',
  },
});


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
        <Grid container spacing={2} direction="row" sx={{ mt: 2 }}>
          <ThemeProvider theme={theme}>
            {products.map((product) => (
              <Grid key={product.id} item lg={2} md={3} sm={4} xs={6}>
                <Link to={`/itemDetail/${product.id}`}>
                  <Card sx={{ maxWidth: 250 }}>
                    <CardActionArea sx={{ mt: 2, mx: 0, my: 0 }}>
                      <CardMedia
                        component="img"
                        style={{
                          width: "306px",
                          height: "175px"
                        }}
                        src={product.image}
                        alt=""
                      />
                      <CardContent>
                        <Typography variant="h4Custom" sx={{ display: 'block', mb: 1 }}>
                          {product.title} 
                        </Typography>
                        <Typography variant="h2Custom" sx={{ display: 'block'}}>
                          $ {product.unit_price}
                        </Typography>
                        <BootstrapButton variant="contained" disableRipple>
                          Agregar al carrito <Icon icon="fontisto:shopping-basket" />
                        </BootstrapButton>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              </Grid>
            ))}
          </ThemeProvider>
        </Grid>
      </Box>
    </div>
  );
};

export default ItemListContainer;