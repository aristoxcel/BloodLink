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
import ContentManagement from "../Dashboard/AdminDashboard/ContentManagement";
import MyDonationReq from "../Dashboard/DonarDashboard/MyDonationReq";
import SearchBlood from "../SearchBlood/SearchBlood";
import DonationDetail from "../DonationDetail/DonationDetail";
import DonationDetailPublic from "../DonationDetail/DonationDetailPublic";
import AddBlog from "../Dashboard/AddBlog";
import BlogDetail from "../Blog/BlogDetail";
import ErrorPage from "../Authentication/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";



export const router =createBrowserRouter([
    {
      path:'/',
      element:<MainLayout></MainLayout>,
      errorElement: <ErrorPage/>,
      children:[
        {path:'/', element:<Home></Home>},
        {path:'/login', element:<Login></Login>},
        {path:'/SignUp', element:<Signup></Signup>},
        {path:'/Blood-Request', element:<DonationRequest></DonationRequest>},
        {path:'/Search-Blood', element:<SearchBlood></SearchBlood>},
        {path:'/Blog', element:<Blog></Blog>},
        {path:'/blogDetail/:id', element:<PrivateRoute><BlogDetail></BlogDetail></PrivateRoute>},
        {path:'/Funding', element:<Funding></Funding>},
        {path:'/donationDetail/:id', element:<PrivateRoute><DonationDetail></DonationDetail></PrivateRoute>},
        {path:'/donationDetailPublic/:id', element:<PrivateRoute><DonationDetailPublic></DonationDetailPublic></PrivateRoute>}
      ]
    },
    {
      path:'/dashboard',
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        {index:true, element:<PrivateRoute><DashHome></DashHome></PrivateRoute>},
        {path:'profile', element:<PrivateRoute><Profile></Profile></PrivateRoute>},


        {path:'all-users', element:<PrivateRoute><AdminRoute><AllUsers></AllUsers></AdminRoute></PrivateRoute>},


        {path:'create-donation-request', element:<PrivateRoute><CreateDonationRequest></CreateDonationRequest></PrivateRoute>},
        {path:'my-donation-requests', element:<PrivateRoute><MyDonationReq></MyDonationReq></PrivateRoute>},
        
        
        {path:'all-blood-donation-request', element:<PrivateRoute><AllBloodDonationReq></AllBloodDonationReq></PrivateRoute>},
        {path:'content-management', element:<PrivateRoute><ContentManagement></ContentManagement></PrivateRoute>},
        {path:'add-blog', element:<PrivateRoute><AddBlog></AddBlog></PrivateRoute>},
     
      ]
    }
  ])  