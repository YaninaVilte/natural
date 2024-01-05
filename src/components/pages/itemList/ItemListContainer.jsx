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
import CarruselItemListContainer from "../itemList/CarruselItemListContainer";
import { menuNavigate } from "../../../router/menuNavigate";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


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
        <div className="itemListContainer">
        <Typography variant="titulo">Categorías</Typography>
        <div className="categoriasContainer">
          {menuNavigate.map(({ id, path, title, icon }) => (
            <Link key={id} to={path} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div tabIndex="0" onClick={handleButtonClick} className="categoriasContent">
                <Icon icon={icon} />
                <Typography variant="category">
                  {title}
                </Typography>
              </div>
            </Link>
          ))}
        </div>



      <h1>Estoy en el shop</h1>
      <div className="itemsFilterContainer">
            <div className="filtrosContainer">
              <h1>Filtros</h1>
            </div>
            <div className="itemsContainer">
            <div className="itemContainer">
            {products.map((product) => (
              <div key={product.id} className="cardContainer">
                  <CardMedia component="img" src={product.image} alt="Imagen del producto"/>
                  <Typography variant="h4Custom" sx={{ display: 'block', marginLeft: "12px", mb: 1 }}>{product.title} </Typography>
                  <Typography variant="h2Custom" sx={{ display: 'block', marginLeft: "12px", }}>$ {product.unit_price}</Typography>
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