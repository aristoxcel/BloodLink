import { useState } from 'react'
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md";
import { GrOverview } from "react-icons/gr";
import { Link } from 'react-router-dom';
import ReqStatus from '../../Components/ReqStatus';

// import UpdateUserModal from '../../../Modal/UpdateUserModal'
// import { updateRole } from '../../../../api/auth'
// import { toast } from 'react-hot-toast'
const DonarData = ({ user, refetch, handleDelete }) => {
  const [isOpen, setIsOpen] = useState(false)
//   const modalHandler = async role => {
//     try {
//       const data = await updateRole({ email: user?.email, role })
//       console.log(data)
//       refetch()
//       toast.success('User role updated!')
//     } catch (err) {
//       console.log(err)
//       toast.error(err.message)
//     } finally {
//       setIsOpen(false)
//     }
//   }
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

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
      <ReqStatus userId={user._id} initialStatus={user.status} />
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.name}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'><Link to={'create-donation-request'}><FaEdit  className='text-2xl hover:text-3xl hover:text-green-600'></FaEdit></Link></p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button onClick={() => handleDelete(user?._id)} className='text-gray-900 whitespace-no-wrap'><MdDelete className='text-3xl hover:text-4xl hover:text-red-600'/></button>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'><Link to={`/donationDetail/${user?._id}`}><GrOverview className='text-2xl hover:text-3xl hover:text-yellow-600'/></Link> </p>
      </td>
      
    </tr>
  ) 
}
export default DonarData