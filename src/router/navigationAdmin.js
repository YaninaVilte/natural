import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


export const menuItemsAdmin = [

    {
        id: "home",
        path: "/",
        title: "Inicio",
        Icon: HomeIcon
    },
    {
        id: "products",
        path: "/shop",
        title: "Tienda",
        Icon: StoreIcon
    },
    {
        id: "cart",
        path: "/cart",
        title: "Carrito",
        Icon: ShoppingCartCheckoutIcon
    },
    {
        id: "cart",
        path: "/cart",
        title: "Carrito",
        Icon: ShoppingCartCheckoutIcon
    },
    {
        id: "Login",
        path: "/Login",
        title: "Admin",
        Icon: AdminPanelSettingsIcon,
    }
]