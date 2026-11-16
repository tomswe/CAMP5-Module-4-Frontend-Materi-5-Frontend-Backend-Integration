import React from "react";
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import './index.css'

import { CoffeeProvider } from "./context/CoffeeContext.jsx";
import Navbar from './components/Navbar.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

import Home from "./pages/Home.jsx";
import Detail from "./pages/Detail.jsx";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct.jsx";
import { api } from "./services/api.js";

// Layout Wrapper
// Root Layout

function RootLayout() {
  return (
    <CoffeeProvider>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
    </CoffeeProvider>
  )
}

function HydrateFallback() {
  return (
    <div className="p-6 text-center">
      App is loading...
    </div>
  )
}

// React Router v7 Loaders ==> Eliminasi useEffect seluruh halaman
const homeLoader = async () => {
  const res = await api.get('/products')
  return { products: res.data.data }
}

const detailLoader = async ({ params }) => {
  const res = await api.get(`/products/${params.slug}`)
  return { product: res.data.data }
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    HydrateFallback,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: homeLoader,
        errorElement: <ErrorBoundary />
      },
      {
        path: '/products/new',
        element: <CreateProduct />,
        errorElement: <ErrorBoundary />
      },
      {
        path: '/products/:slug',
        element: <Detail />,
        loader: detailLoader,
        errorElement: <ErrorBoundary />
      },
      {
        path: '/products/:slug/edit',
        element: <EditProduct />,
        loader: detailLoader,
        errorElement: <ErrorBoundary />
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);