import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";

import Checkout from "../pages/Checkout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Layout from "../layouts/Layout";
import LayoutAdmin from "../layouts/LayoutAdmin";
import Dashboard from "../pages/admin/Dashboard";
import Category from "../pages/admin/Category";
import Product from "../pages/admin/Product";
import Manage from "../pages/admin/Manage";
import LayoutUser from "../layouts/LayoutUser";
import HomePage from "../pages/user/HomePage";
import ProtecUser from "./ProtecUser";
import ProtecAdmin from "./ProtecAdmin";
import EditProduct from "@/pages/admin/EditProduct";
import Payment from "@/pages/user/Payment";
import History from "@/pages/user/History";
import ManageOrder from "@/pages/admin/ManageOrder";

const router = createBrowserRouter([
  {
    // user สามารถกดเข้าไปดูได้โดยที่ไม่ต้อง Login
    path: "/",
    element: <Layout />,
    children: [
      { index: true , element: <Home /> },//index: true  ----> path Main
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
      { path: "history", element: <History /> },
      { path: "checkout", element: <Checkout /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    // Home Page is Admin
    path: '/admin',
    // element: <LayoutAdmin/>,
    element: <ProtecAdmin element={<LayoutAdmin/>}/>,
    children:[
      {index: true , element: <Dashboard/>},
      {path:'category' , element: <Category/>},
      {path:'product' , element: <Product/>},
      {path:'product/:id' , element: <EditProduct/>},
      {path:'manage' , element: <Manage/>},
      {path:'orders' , element: <ManageOrder/>}
    ]
  },
  {
    path: '/user',
    // element: <LayoutUser/>,
    element: <ProtecUser element={<LayoutUser/>}/>,
    children:[
      {index: true , element: <HomePage/>},
      {path:'payment', element: <Payment/>},
      { path: "history", element: <History /> }
    ]
  }
]);

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default AppRoutes;
