import {  useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { getDocs, collection, query, where } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { Box, Card,CardMedia, Grid, Pagination, PaginationItem, Typography } from "@mui/material";
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import { RotatingTriangles } from  'react-loader-spinner'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import CarruselItemListContainer from "../itemList/CarruselItemListContainer";
import { menuNavigate } from "../../../router/menuNavigate";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const StyledDiv = styled('div')({
  width: '153px',
  height: '147px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#164439',
  margin: '20px 10px 50px 10px',
  borderRadius: '2px',
  transition: 'background-color 0.3s ease-in-out',
  '&:hover': {
    borderRadius: '2px',
    border: '1px solid #FF6',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    '& svg': {
      color: '#FFFF66',
    },
  },
  '&:focus': {
    borderRadius: '2px',
    border: '1px solid #FFC8B9',
    background: '#052C22',
    '& svg': {
      color: '#FFC8B9',
    },
  },
  '& svg': {
    width: '40px',
    height: '40px',
    transition: 'color 0.3s ease-in-out',
    color: 'white',
  },
});

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  borderRadius: "0px",
  textTransform: 'none',
  width: "222px",
  height: "37px",
  backgroundColor: '#164439',
  '&:hover': {
    boxShadow: 'none',
    backgroundColor: '#164439',
    textAlign: 'center',
    '& svg': {
      color: '#41A88A',
    },
    '& .MuiTypography-root': {
      color: '#41A88A',
      textShadow: '1px 1px 0px rgba(0, 0, 0, 0.25)',
      fontStyle: 'italic',
    },
  },
});



const ItemListContainer = () => {

  const [isActive, setIsActive] = useState(false);
  const [products, setProducts] = useState([]);
  const { categoryName } = useParams();

  const handleButtonClick = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    let refCollection = collection(db, "products");
    let consulta;
    
    if (categoryName) {
      consulta = query(refCollection, where("category", "==", categoryName))
    } else {
      consulta = refCollection
    }

    getDocs(consulta)
      .then((res) => {
        let newArray = res.docs.map((product) => {
          return { ...product.data(), id: product.id };
        });

        setProducts(newArray);
      })
      .catch((err) => console.log(err));
  }, [categoryName]);


  


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
      <ThemeProvider theme={theme}>
      <div>
      <CarruselItemListContainer /> 
      </div>
        <Typography variant="titulo">Categorías</Typography>
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          {menuNavigate.map(({ id, path, title, icon }) => (
            <Link key={id} to={path} style={{ textDecoration: 'none', color: 'inherit' }}>
              <StyledDiv tabIndex="0" onClick={handleButtonClick}>
                <Icon icon={icon} />
                <br />
                <Typography variant="category" sx={{ alignItems: 'center', marginTop: '10px', color: 'white' }}>
                  {title}
                </Typography>
              </StyledDiv>
            </Link>
          ))}
        </div>



      <h1>Estoy en el shop</h1>
        <Box sx={{ mt: 2, mx: 3 }}>
          <Grid container spacing={2} direction="row" sx={{ mt: 2, marginBottom: "100px" }}>
            {products.map((product) => (
              <Grid key={product.id} item lg={3} md={4} sm={5} xs={7} >
                <Card style={{ width: "330px", display: "flex", flexDirection: "column", height: "330px", borderRadius: "2px", background: "#F8F8F8", boxShadow: "3px 4px 11px 0px rgba(0, 0, 0, 0.10)", }}>
                  <CardMedia component="img" style={{ width: "306px", height: "175px", margin: "13px", borderTopRightRadius: "100px" }} src={product.image} alt="" />
                  <Typography variant="h4Custom" sx={{ display: 'block', marginLeft: "12px", mb: 1 }}>{product.title} </Typography>
                  <Typography variant="h2Custom" sx={{ display: 'block', marginLeft: "12px", }}>$ {product.unit_price}</Typography>
                  <div style={{ marginLeft: 'auto', marginTop: 'auto', marginRight: "12px", marginBottom: "14px", }}>
                    <Link to={`/itemDetail/${product.id}`} sx={{}}>
                      <BootstrapButton variant="contained" disableRipple sx={{}}><Typography variant="detalle">Ver detalle</Typography>
                        <Box m={0.3} /><Icon icon="fontisto:shopping-basket" />
                      </BootstrapButton>
                    </Link>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={10}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default ItemListContainer;