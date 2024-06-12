/* eslint-disable react/prop-types */

// import { useState } from 'react'
import ThreeDotMenu from '../../Components/ThreeDotMenu'
import RoleChange from '../../Components/RoleChange'

const UserData = ({ user }) => {

  return (
    <tr>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <img src={user?.image} alt="" className='w-16 h-16'/>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user?.status ? (
          <p
            className={`${
              user.status === 'active' ? 'text-green-500' : 'text-yellow-500'
            } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className='text-red-500 whitespace-no-wrap'>Block</p>
        )}
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
      <ThreeDotMenu userId={user._id} initialStatus={user.status} />
        {/* <span
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
        >
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update Role</span>
        </span>
    
        <UpdateUserModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          user={user}
          modalHandler={modalHandler}
        /> */}
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
      <RoleChange userId={user._id} />
        
      </td>
    </tr>
  )
}

export default UserData
//3 no.class