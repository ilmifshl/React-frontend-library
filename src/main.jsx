import React from "react";
import ReactDOM from "react-dom/client";[]
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import Transactions from "./pages/admin/Transactions.jsx";
import Profile from "./pages/admin/Profile.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedLayout from "./layouts/ProtectedLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import UserDashboard from "./pages/user/UserDashboard.jsx";
import Book from "./pages/admin/Book.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          {
            path: "/admin/",
            element: <Navigate to="/admin/dashboard" replace />,
          },
          {
            path: '/admin/dashboard',
            element: <AdminDashboard />
          },
          {
            path: '/admin/transactions',
            element: <Transactions />
          },
          {
            path: '/admin/profile',
            element: <Profile />
          },
          {
            path: '/admin/book',
            element: <Book />
          }
        ]
      },
      {
        path: '/user/dashboard',
        element: <UserDashboard />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </NextUIProvider>
  </React.StrictMode>
);  
