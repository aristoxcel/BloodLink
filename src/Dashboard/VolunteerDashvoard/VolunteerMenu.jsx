import MenuItem from "../../Components/MenuItem"
import { MdOutlineBloodtype } from "react-icons/md"
import { MdHomeWork } from 'react-icons/md'

function VolunteerMenu() {
    return (
        <>
          <MenuItem icon={MdOutlineBloodtype } label='All Blood Donation Request' address='/dashboard/all-blood-donation-request' />
          <MenuItem icon={MdHomeWork} label='Content Management' address='/dashboard/content-management' />
        </>
      )
}

export default VolunteerMenu