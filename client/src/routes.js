import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  BLOG_ROUTE,
  CERTIFICATE_ROUTE,
  LOGIN_ROUTE,
  PRODUCT_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
  POST_ROUTE,
  ORDER_ROUTE,
} from "./utils/consts";
import Admin from "./pages/Admin";
import Shop from "./pages/Shop/Shop.js";
import Certificate from "./pages/Certi/Certificate";
import Blog from "./pages/Blog/Blog.js";
import Basket from "./components/modals/BasketModal/basketModal.jsx";
import ProductPage from "./pages/ProductPage/ProductPage";
import Auth from "./pages/auth.js";
import PostPage from "./pages/PostPage/PostPage.jsx";
import Order from "./components/modals/OrderModal/orderModal";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: CERTIFICATE_ROUTE,
    Component: Certificate,
  },
  {
    path: POST_ROUTE + "/:id",
    Component: PostPage,
  },
  {
    path: POST_ROUTE,
    Component: Blog,
  },
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
  {
    path: ORDER_ROUTE,
    Component: Order,
  },
  {
    path: PRODUCT_ROUTE + "/:id",
    Component: ProductPage,
  },
  // {
  //   path: REGISTRATION_ROUTE,
  //   Component: Auth,
  // },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
];
