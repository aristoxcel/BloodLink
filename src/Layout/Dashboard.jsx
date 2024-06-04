import { Link, Outlet } from "react-router-dom"


function Dashboard() {
  return (
    <div className="flex">
        <div className="bg-red-400 min-h-screen w-64 ">
            <ul className="flex flex-col justify-between">
                <Link to={''}>Admin Home</Link>
                <Link to={'allUsers'}>All users</Link>
                <Link to={'profile'}>Profile</Link>
                <Link to={'/'}>Home</Link>
            </ul>
        </div>
        <div className="bg-gray-300  w-full">
            <Outlet/>
        </div>
    </div>
  )
}

export default Dashboard