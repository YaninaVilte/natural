import Cart from "../components/pages/cart/Cart";
import Favorites from "../components/pages/favorites/FavoritesComponent";
// import Checkout from "../components/pages/checkout/Checkout";
import Home from "../components/pages/home/Home";
import ItemDetail from "../components/pages/itemDetail/ItemDetail";
import ItemListContainer from "../components/pages/itemList/ItemListContainer";
// import UserOrders from "../components/pages/userOrders/UserOrders";

export const routes = [
  {
    id: "home",
    path: "/",
    Element: Home,
  },
  {
    id: "shop",
    path: "/shop",
    Element: ItemListContainer,
  },
  {
    id: "categories",
    path: "/category/:categoryName",
    Element: ItemListContainer
  },
  {
    id: "detalle",
    path: "/itemDetail/:id",
    Element: ItemDetail,
  },
  {
    id: "cart",
    path: "/cart",
    Element: Cart,
  },
  {
    id: "favorites",
    path: "/favorites",
    Element: Favorites,
  },
  // {
  //   id: "checkout",
  //   path: "/checkout",
  //   Element: Checkout,
  // },
  // {
  //   id: "userOrders",
  //   path: "/user-orders",
  //   Element: UserOrders,
  // },
];
