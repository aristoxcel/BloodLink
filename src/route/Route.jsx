import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Home/Home";
import Login from "../Authentication/Login";
import Signup from "../Authentication/Signup";
import DonationRequest from "../DonationRequest/DonationRequest";
import Blog from "../Blog/Blog";
import Funding from "../Funding/Funding";
import Dashboard from "../Layout/Dashboard";
import Profile from "../Dashboard/Profile";
import AllUsers from "../Dashboard/AdminDashboard/AllUsers";
import CreateDonationRequest from "../Dashboard/DonarDashboard/CreateDonationRequest";
import DashHome from "../Dashboard/DashHome";
import AllBloodDonationReq from "../Dashboard/VolunteerDashvoard/AllBloodDonationReq";
import ContentManagement from "../Dashboard/VolunteerDashvoard/ContentManagement";
import MyDonationReq from "../Dashboard/DonarDashboard/MyDonationReq";
import SearchBlood from "../SearchBlood/SearchBlood";



export const router =createBrowserRouter([
    {
      path:'/',
      element:<MainLayout></MainLayout>,
      children:[
        {path:'/', element:<Home></Home>},
        {path:'/login', element:<Login></Login>},
        {path:'/SignUp', element:<Signup></Signup>},
        {path:'/Blood-Request', element:<DonationRequest></DonationRequest>},
        {path:'/Search-Blood', element:<SearchBlood></SearchBlood>},
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


        {path:'all-users', element:<AllUsers></AllUsers>},


        {path:'create-donation-request', element:<CreateDonationRequest></CreateDonationRequest>},
        {path:'my-donation-requests', element:<MyDonationReq></MyDonationReq>},
        
        
        {path:'all-blood-donation-request', element:<AllBloodDonationReq></AllBloodDonationReq>},
        {path:'content-management', element:<ContentManagement></ContentManagement>},
     
      ]
    }
  ])