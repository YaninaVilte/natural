import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartContextComponent = ({ children }) => {
  const [cart, setCart] = useState( JSON.parse(localStorage.getItem("cart")) || []);

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (productId, productQuantity, productStock) =>{
    const addProduct = {productId, productQuantity};
    const productsAOnCart = [...cart];
    const existingProduct = productsAOnCart.find((el)=>el.productId === addProduct.productId);

    if(existingProduct){
    (existingProduct.productQuantity + productQuantity) >= productStock ?
    existingProduct.productQuantity = productStock :
    existingProduct.productQuantity += productQuantity 
    }else{
      productsAOnCart.push(addProduct);
    }
    setCart(productsAOnCart);
  }

  const getQuantityById = (id)=>{
    let product = cart.find( elemento => elemento.id === id)
    return product?.quantity
  }

  const clearCart = ()=>{
    setCart( [] )
    localStorage.removeItem("cart")
  }

  const deleteById = (id)=>{
    const newArr = cart.filter( elemento => elemento.id !== id)
    localStorage.setItem("cart", JSON.stringify(newArr))
    setCart(newArr)
  }

  const getTotalItems = () => {
    let total = cart.reduce((acc, elemento) => {
      return acc + elemento.quantity
    }, 0)
    return total
  }

  const getTotalPrice = ()=>{
    const total = cart.reduce( (acc, elemento)=>{
        return acc + (elemento.unit_price * elemento.quantity)
    }, 0)
    return total
  }

    let data = {
        cart,
        addToCart,
        getQuantityById,
        clearCart,
        deleteById,
        getTotalPrice,
        getTotalItems,
    }
  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default CartContextComponent;
