import { useState } from "react"
import { FcSettings } from 'react-icons/fc'
import { HiHomeModern, HiOutlineBars3BottomRight } from "react-icons/hi2"
import { Link, useNavigate } from "react-router-dom"
import AdminMenu from "../Dashboard/AdminDashboard/AdminMenu"
import VolunteerMenu from "../Dashboard/VolunteerDashvoard/VolunteerMenu"
import useAuth from "../Authentication/hooks/useAuth"
import useRole from "../Authentication/hooks/useRole"
import MenuItem from "./MenuItem"
import DonarMenu from "../Dashboard/DonarDashboard/DonarMenu"
import toast from "react-hot-toast"
import { RiLogoutCircleRLine } from "react-icons/ri"


function Sidebar() {
  const navigate = useNavigate()
    const { logOut } = useAuth()
    const [isActive, setActive] = useState(false)
    // const [toggle, setToggle] = useState(true)
    const [role, isLoading] = useRole()
    console.log(role, isLoading)
    // Sidebar Responsive Handler
    const handleToggle = () => {
      setActive(!isActive)
    }

    const handleLogOut = () => {
        logOut()
            .then(() => { 
              console.log('logout');
              navigate('/')
              toast.success("You Logged Out Successfully")
            })
            .catch(error => console.log(error));
    }
    // const toggleHandler = event => {
    //   setToggle(event.target.checked)
    // }
    return (
      <>
        {/* Small Screen Navbar */}
        <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
          <div>
            <div className='block cursor-pointer p-4 font-bold'>
              <Link to='/' className="flex items-center gap-1">
                <img
                  // className='hidden md:block'
                  src='file.png'
                  alt='logo'
                  width='40'
                  height='40'
                /> BloodLink
              </Link>
            </div>
          </div>
  
          <button
            onClick={handleToggle}
            className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
          >
            <HiOutlineBars3BottomRight className='h-8 w-10' />
          </button>
        </div>
  
        {/* Sidebar */}
        <div
          className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
            isActive && '-translate-x-full'
          }  md:translate-x-0  transition duration-200 ease-in-out`}
        >
          <div>
            <div>
              <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-[#c4052b] mx-auto'>
                <Link to='/' className="flex items-center gap-2 text-white font-bold">
                  <img
                    // className='hidden md:block'
                    src='https://i.ibb.co/gS0npFY/file.png'
                    alt='logo'
                    width='40'
                    height='40'
                  />BloodLink
                </Link>
              </div>
            </div>
  
            {/* Nav Items */}
            <div className='flex flex-col justify-between flex-1 mt-6'>
              {/* Conditional toggle button here.. */}
              {/* {role === 'host' && (
                <ToggleBtn toggleHandler={toggleHandler} toggle={toggle} />
              )} */}
  
              {/*  Menu Items */}
              <nav>
                {/* Statistics */}
                <MenuItem
                  label='Home'
                  address='/dashboard'
                  icon={HiHomeModern}
                />
                {role === 'donar' && <DonarMenu />}
                {role === 'volunteer' && <VolunteerMenu/>}
                {role === 'admin' && <AdminMenu />}
              </nav>
            </div>
          </div>
  
          <div>
            <hr />
  
            {/* Profile Menu */}
            <MenuItem
              label='Profile'
              address='/dashboard/profile'
              icon={FcSettings}
            />
  
            <button
              onClick={handleLogOut}
              className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
            >
              <RiLogoutCircleRLine   className='w-5 h-5' />
  
              <span className='mx-4 font-medium'>Logout</span>
            </button>
          </div>
        </div>
      </>
    )
}

export default Sidebar