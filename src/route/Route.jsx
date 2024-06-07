import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Home/Home";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import DonationRequest from "../DonationRequest/DonationRequest";
import SearchDonor from "../SearchDonor/SearchDonor";
import Blog from "../Blog/Blog";
import Funding from "../Funding/Funding";
import Dashboard from "../Layout/Dashboard";
import Profile from "../Dashboard/Profile";
import AllUsers from "../Dashboard/AdminDashboard/AllUsers";
import CreateDonationRequest from "../Dashboard/DonarDashboard/CreateDonationRequest";
import DashHome from "../Dashboard/DashHome";



export const router =createBrowserRouter([
    {
      path:'/',
      element:<MainLayout></MainLayout>,
      children:[
        {path:'/', element:<Home></Home>},
        {path:'/login', element:<Login></Login>},
        {path:'/SignUp', element:<Signup></Signup>},
        {path:'/Add-Donar', element:<DonationRequest></DonationRequest>},
        {path:'/Search-Donar', element:<SearchDonor></SearchDonor>},
        {path:'/Blog', element:<Blog></Blog>},
        {path:'/Funding', element:<Funding></Funding>}
      ]
    },
    {
      path:'/dashboard',
      element:<Dashboard></Dashboard>,
      children:[
        {index:true, element:<DashHome></DashHome>},
        {path:'profile', element:<Profile></Profile>},
        {path:'allUsers', element:<AllUsers></AllUsers>},



        {path:'create-donation-request', element:<CreateDonationRequest></CreateDonationRequest>},
     
      ]
    }
  ])