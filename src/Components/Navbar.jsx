import { useContext, useState } from 'react';
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';



    

export const Navbar = () => {
    const [dropDownState, setDropDownState] = useState(false);
    const dropDownMenuRef = useRef();
    const {user, logOut}=useContext(AuthContext)

    const handleLogOut = () => {
      console.log("touch kaj kore")
      logOut()
          .then(() => { 
            console.log('logout');
            Swal.fire({
              icon: "success",
              title: "you logged out successfully",
              showConfirmButton: false,
              timer: 1500
            });
          })
          .catch(error => console.log(error));
  }

    // useEffect(() => {
    //     const closeDropDown = (e) => {
    //         if (.current?.contains(e?.target)) {
    //             setDropDownState(false);
    //         }
    //     };

    //     document.addEventListener('mousedown', closeDropDown);
        

    //     return () => {
    //         document.removeEventListener('mousedown', closeDropDown);
    //     };
    // }, []);

    return (
        <nav className="relative flex items-center justify-between bg-[#c4052b] px-4 py-2 text-white">
        <div className="scale-100 cursor-pointer rounded-2xl px-3 py-2 text-xl font-semibold text-white transition-all duration-200 hover:scale-110">
          <h2 className='flex items-center'><img src="file.png" alt="" className='h-10 mr-2'/><span className='text-2xl'>BloodLink</span></h2>
        </div>
        <ul className="hidden items-center justify-between gap-10 md:gap-5 lg:gap-10 font-semibold  md:flex">
          <NavLink to={'/'} className="group flex  cursor-pointer flex-col pl-2">
            Home<span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-700 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          <NavLink to={'/Search-Blood'} className="group flex  cursor-pointer flex-col">
            Search Blood<span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-sky-700 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          <NavLink to={'/Blood-Request'} className="group flex  cursor-pointer flex-col">
            Blood Donation Request<span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-sky-700 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          
          <NavLink to={'/Blog'} className="group flex  cursor-pointer flex-col">
            Blog<span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-sky-700 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
          
         {user?.email && <NavLink to={'/Funding'} className="group flex  cursor-pointer flex-col">
            Funding<span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-sky-700 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>}
       
          {user?.email ?
      
        (
          
          <li className="relative mr-5">
                <button onClick={() => setDropDownState(!dropDownState)} className="relative rounded-full flex items-center gap-1 py-2 ">
                    <span><img src={user?.photoURL || "file.png"} className='w-10 h-10 rounded-full  ' alt="" /></span>
                    <svg className={`${dropDownState ? '' : 'rotate-180'}`} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                </button>
                {dropDownState && (
                    <ul className="absolute top-14 right-2 !z-[999] space-y-2 rounded-lg bg-[#c4052bcd] p-2 px-4 text-gray-100">
                        <NavLink to={'/dashboard'}  className="group flex  cursor-pointer flex-col">
                        Dashboard<span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                         </NavLink>
                        <NavLink  className="group flex  cursor-pointer flex-col" onClick={handleLogOut}>
                        Logout<span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                        </NavLink>
                    </ul>
                )}
          </li>
         )
          : 
          <NavLink to={'/login'} className="group flex  cursor-pointer flex-col">
          Login<span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-sky-700 transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
        }
          
        </ul>
        <div ref={dropDownMenuRef} onClick={() => setDropDownState(!dropDownState)} className="relative flex transition-transform md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer" > <line x1="4" x2="20" y1="12" y2="12" /> <line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /> </svg>
          {dropDownState && (
            <ul className=" z-10  gap-2  bg-[#c4052bcd]  absolute right-0 top-11 flex w-[200px] flex-col  rounded-lg   text-base ">
              <NavLink  to={'/'}  className="cursor-pointer  px-6 py-2 text-white rounded-t-lg hover:bg-sky-700 ">
                Home
              </NavLink>
              <NavLink to={'/Add-Donar'}  className="cursor-pointer  px-6 py-2 text-white hover:bg-sky-700 ">
              Add Donar Request
              </NavLink>
              <NavLink to={'/Search-Blood'}  className="cursor-pointer  px-6 py-2 text-white hover:bg-sky-700 ">
              Search Donar
              </NavLink>
              <NavLink to={'/Blog'}  className="cursor-pointer  px-6 py-2 text-white hover:bg-sky-700 ">
              Blog
              </NavLink>
              <NavLink  to={'/Funding'} className="cursor-pointer  px-6 py-2 text-white hover:bg-sky-700 ">
              Funding
              </NavLink>
             {user?.email ?<>
              <NavLink to={'/dashboard'}  className="cursor-pointer  px-6 py-2 text-white hover:bg-sky-700 ">
              Dashboard
              </NavLink>
              <NavLink  className="cursor-pointer  px-6 py-2 text-white hover:bg-sky-700 " onClick={handleLogOut}>
              Logout
              </NavLink>
             </>
              :
              <NavLink to={'/login'} className="cursor-pointer  px-6 py-2 text-white hover:bg-sky-700 ">
              Login
              </NavLink>
            }
            </ul>
          )}
        </div>
</nav>
  

    );
};

