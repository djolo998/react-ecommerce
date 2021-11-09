import { ProtectedRoute, AuthRoute } from "./util";

import Layout from "../components/Layout";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CartPage from "../pages/CartPage";
import AccountPage from "../pages/AccountPage";
import ProductPage from "../pages/ProductPage";

const basicRoutes = [
  {
    route: ProtectedRoute,
    path: "/",
    component: HomePage,
    layout: Layout,
  },
  {
    route: ProtectedRoute,
    path: "/cart",
    component: CartPage,
    layout: Layout,
  },
  {
    route: ProtectedRoute,
    path: "/me",
    component: AccountPage,
    layout: Layout,
  },
  {
    route: ProtectedRoute,
    path: "/products/:productId",
    component: ProductPage,
    layout: Layout,
  },
  { route: AuthRoute, path: "/login", component: LoginPage, layout: Layout },
  {
    route: AuthRoute,
    path: "/register",
    component: RegisterPage,
    layout: Layout,
  },
];

export default basicRoutes;
