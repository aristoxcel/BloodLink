import { Outlet } from "react-router-dom"
import Sidebar from "../Components/Sidebar"


function Dashboard() {
  return (
    <div className='relative min-h-screen md:flex'>
      {/* Sidebar */}
      <Sidebar />

      {/* Outlet --> Dynamic content */}
      <div className='flex-1 md:ml-64'>
        <div className='p-5'>
          <Outlet />
        </div>
      </div>
    </div>
    // <div className="flex">
    //     <div className="bg-red-400 min-h-screen w-64 ">
    //         <ul className="flex flex-col justify-between">
    //             <Link to={''}>Admin Home</Link>
    //             <Link to={'allUsers'}>All users</Link>
    //             <Link to={'profile'}>Profile</Link>
    //             <Link to={'create-donation-request'}>Create Donation Request</Link>
    //             <Link to={'/'}>Home</Link>
    //         </ul>
    //     </div>
    //     <div className="bg-gray-300  w-full">
    //         <Outlet/>
    //     </div>
    // </div>
  )
}

export default Dashboard