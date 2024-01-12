import {  useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { getDocs, collection, query, where } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { Box,CardMedia, Pagination, PaginationItem, Typography } from "@mui/material";
import theme from "../../../temaConfig";
import { ThemeProvider } from "@emotion/react";
import { RotatingTriangles } from  'react-loader-spinner'
import Button from '@mui/material/Button';
import { Icon } from '@iconify/react';
import { menuNavigate } from "../../../router/menuNavigate";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Slider from './Slider.jsx'
import headBrandsMock from './headBrands-mock.json'

const ItemListContainer = () => {

  const [products, setProducts] = useState([]);
  const { categoryName } = useParams();

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
    <div className="products-section-container">
      <ThemeProvider theme={theme}>
        <div className="headBrands-container">
            <Slider space={0} uniqueSlide={true} navigationActive={false} paginationActive={true} categories={headBrandsMock} sliderType={'headBrands'}/>
        </div>
        <div className="itemListContainer">
          <Typography variant="titulo" className="category-title">Categorías</Typography>
          <div className="category-controllers-container">
            <div className="categoriasContainer">
            <Slider space={50} uniqueSlide={false} navigationActive={true} paginationActive={false} categories={menuNavigate} sliderType={'categories'}/>
            </div>
          </div>
      
          <div className="itemsFilterContainer">
            <div className="itemsContainer">
              <div className="itemContainer">
                {products.map((product) => (
                  <div key={product.id} className="cardContainer">
                    <CardMedia component="img" src={product.image} alt="Imagen del producto"/>
                    <Typography variant="h4Custom" sx={{ display: 'block', mb: 1 }}>{product.title} </Typography>
                    <Typography variant="h2Custom" sx={{ display: 'block' }}>
                      {product.unit_price.toLocaleString('es-AR', {
                        style: 'currency',
                        currency: 'ARS',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}
                    </Typography>
                    <div className="butonDetailContainer">
                      <Link to={`/itemDetail/${product.id}`}>
                        <Button variant="contained" disableRipple className="buttonToDetail"><Typography variant="detalle">Ver detalle</Typography>
                          <Box m={0.3} /><Icon icon="fontisto:shopping-basket" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <Pagination
                  count={10}
                  renderItem={(item) => (
                    <PaginationItem
                      slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                      {...item}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        
        </div>
      </ThemeProvider>
    </div>
  );
};

export default ItemListContainer;