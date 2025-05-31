import AdminLayout  from "./layouts/admin/AdminLayout";
import MainLayout  from "./layouts/main/MainLayout";
import  Cart from "./layouts/main/Cart";
import MainPage from "./layouts/main/MainPage";
import { LoginPage } from "./LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import  InventoryManage  from "./layouts/admin/InventoryManage";

export const list = [
  {
    layout: <MainLayout />,
    root: '',
    routes: [
        { name: 'Kezdőlap', path: '', element: <MainPage />, show: true },
        { name: 'Kosár', path: 'cart', element: <Cart />, show: true },
        { name: 'Hiba', path: '*', element: <h1>404-es hiba! Oldal nem található!</h1>, show: false }
      ]
  },
  {
    layout: <AdminLayout />,
    root: '/admin',
    routes: [
      { name: 'Bejelentkezés', path: 'login', element: <LoginPage />, show: false },
      { name: 'Készlet kezelése', path: 'inventory-manage', element: <InventoryManage/>, show: true },
      { name: 'Hiba', path: '*', element: <h1>404-es hiba! Oldal nem található!</h1>, show: false }
    ]
  }
];