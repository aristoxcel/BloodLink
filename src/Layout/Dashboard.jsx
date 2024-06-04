import { Link, Outlet } from "react-router-dom"


function Dashboard() {
  return (
    <div className="flex">
        <div className="bg-red-400 min-h-screen w-64">
            <ul>
                <Link to={''}>Admin Home</Link>
                <li>All users</li>
                <li>Profile</li>
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