import { Outlet } from "react-router-dom"
import Header from "./Header.jsx"
import './styles/AdminLayout.css'

function AdminLayout() {
  return(
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default AdminLayout