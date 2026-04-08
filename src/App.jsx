import { useState } from 'react'
import Header from './layouts/Header.jsx'
import Footer from './layouts/Footer.jsx'
import MainLayout from './layouts/MainLayout.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Admin from './pages/Admin.jsx'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />
        }
      ]
    },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/admin', element: <Admin />}
  ])
  
  return(
    <RouterProvider router={router} />
  )
}

export default App
