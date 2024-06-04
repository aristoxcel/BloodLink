import { Outlet } from "react-router-dom"
import { Navbar } from "../Components/Navbar"



function MainLayout() {
  return (
   <>
   <Navbar/>
    <Outlet/>
   </>
  )
}

export default MainLayout