import { FaUserCog } from 'react-icons/fa'
import { MdHomeWork } from 'react-icons/md'
import { BiSolidDonateBlood } from "react-icons/bi"
import MenuItem from '../../Components/MenuItem'


const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='All Users' address='all-users' />
      <MenuItem icon={BiSolidDonateBlood } label='All Blood Donation Request' address='/dashboard/all-blood-donation-request' />
      <MenuItem icon={MdHomeWork} label='Content Management' address='/dashboard/content-management' />
    </>
  )
}

export default AdminMenu
