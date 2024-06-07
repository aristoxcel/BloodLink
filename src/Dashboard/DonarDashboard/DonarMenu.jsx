import MenuItem from "../../Components/MenuItem"
import { BiSolidDonateBlood } from "react-icons/bi"

import { useState } from 'react'
import useAxiosSecure from "../../Authentication/hooks/useAxiosSecure"
import useAuth from "../../Authentication/hooks/useAuth"
import useRole from "../../Authentication/hooks/useRole"
import toast from 'react-hot-toast'


function DonarMenu() {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [role] = useRole()
    // for modal
    const [isModalOpen, setIsModalOpen] = useState(false)
    const closeModal = () => {
      setIsModalOpen(false)
    }
    const modalHandler = async () => {
      console.log('I want to be a host')
      try {
        const currentUser = {
          email: user?.email,
          role: 'guest',
          status: 'Requested',
        }
        const { data } = await axiosSecure.put(`/user`, currentUser)
        console.log(data)
        if (data.modifiedCount > 0) {
          toast.success('Success! Please wait for admin confirmation')
        } else {
          toast.success('Please!, Wait for admin approval👊')
        }
      } catch (err) {
        console.log(err)
        toast.error(err.message)
      } finally {
        closeModal()
      }
    }
    return (
      <>
        <MenuItem
          icon={BiSolidDonateBlood}
          label='My Donation Requests'
          address='/dashboard/my-donation-requests'
        />
        <MenuItem
          icon={BiSolidDonateBlood}
          label='Blood Donation Request'
          address='/dashboard/create-donation-request'
        />
  
        {/* {role === 'guest' && (
          <div
            onClick={() => setIsModalOpen(true)}
            className='flex items-center px-4 py-2 mt-5  transition-colors duration-300 transform text-gray-600  hover:bg-gray-300   hover:text-gray-700 cursor-pointer'
          >
            <GrUserAdmin className='w-5 h-5' />
  
            <span className='mx-4 font-medium'>Become A Host</span>
          </div>
        )} */}
        {/* Modal
        <VolunteerMenu
          isOpen={isModalOpen}
          closeModal={closeModal}
          modalHandler={modalHandler}
        /> */}
      </>
    )
}

export default DonarMenu