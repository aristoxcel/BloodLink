import { FaUserCog } from 'react-icons/fa'
import MenuItem from '../../Components/MenuItem'
import { MdHomeWork, MdOutlineBloodtype } from 'react-icons/md'


const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='All Users' address='all-users' />
      <MenuItem icon={MdOutlineBloodtype } label='All Blood Donation Request' address='/dashboard/all-blood-donation-request' />
      <MenuItem icon={MdHomeWork} label='Content Management' address='/dashboard/content-management' />
    </>
  )
}

export default AdminMenu
