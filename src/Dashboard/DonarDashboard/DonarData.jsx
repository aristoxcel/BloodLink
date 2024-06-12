/* eslint-disable react/prop-types */

// import { useState } from 'react'
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md";
import { GrOverview } from "react-icons/gr";
import { Link } from 'react-router-dom';
import ReqStatus from '../../Components/ReqStatus';


const DonarData = ({ user, refetch, handleDelete, role }) => {


  return (
    <tr>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.recipient}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.district}, {user?.upazila}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.date}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.time}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user?.status ? (
          <p
            className={`${
              user.status === 'Pending' ? 'text-yellow-500' : 'text-green-500'
            } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className='text-red-500 whitespace-no-wrap'>Inprogress</p>
        )}
      </td>

      {
        user?.status === "inprogress" ?
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          <ReqStatus userId={user._id} initialStatus={user.status} />
        </td>
        :
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
          {}
        </td>
      }
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
      </td>
      {role !== "volunteer"&& 
      <>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'><Link to={'/dashboard/create-donation-request'}><FaEdit  className='text-2xl hover:text-3xl hover:text-green-600'></FaEdit></Link></p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button onClick={() => handleDelete(user?._id)} className='text-gray-900 whitespace-no-wrap'><MdDelete className='text-3xl hover:text-4xl hover:text-red-600'/></button>
      </td>
      </>
      }
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'><Link to={`/donationDetail/${user?._id}`}><GrOverview className='text-2xl hover:text-3xl hover:text-yellow-600'/></Link> </p>
      </td>
      
    </tr>
  ) 
}
export default DonarData