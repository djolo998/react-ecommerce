import Layout from "../components/Layout";
import AdminLayout from "../components/AdminLayout/";
import { ProtectedRoute, AdminRoute } from "./util";

import {
  ListBrandPage,
  UpdateBrandPage,
  CreateBrandPage,
} from "../pages/Admin/Brand";

import {
  ListProductPage,
  UpdateProductPage,
  CreateProductPage,
} from "../pages/Admin/Product";

import {
  ListCategoryPage,
  UpdateCategoryPage,
  CreateCategoryPage,
} from "../pages/Admin/Category";

import { ListOrderPage } from "../pages/Admin/Order";

const routes = [
  {
    path: "/admin/brands",
    component: ListBrandPage,
  },
  {
    path: "/admin/brands/edit/:brandId",
    component: UpdateBrandPage,
  },
  {
    path: "/admin/brands/create",
    component: CreateBrandPage,
  },
  {
    path: "/admin/products",
    component: ListProductPage,
  },
  {
    path: "/admin/products/edit/:productId",
    component: UpdateProductPage,
  },
  {
    path: "/admin/products/create",
    component: CreateProductPage,
  },
  {
    path: "/admin/categories/",
    component: ListCategoryPage,
  },
  {
    path: "/admin/categories/edit/:categoryId",
    component: UpdateCategoryPage,
  },
  {
    path: "/admin/categories/create",
    component: CreateCategoryPage,
  },
  {
    path: "/admin/orders/",
    component: ListOrderPage,
  },
];

const adminRoutes = routes.map((x) => {
  x.route = AdminRoute;
  x.layout = AdminLayout;
  return x;
});

export default adminRoutes;
