import MenuItem from "../../Components/MenuItem"
import { BiSolidDonateBlood } from "react-icons/bi"
import { FaEdit } from "react-icons/fa"


function DonarMenu() {
  
    return (
      <>
        <MenuItem
          icon={BiSolidDonateBlood}
          label='My Donation Requests'
          address='/dashboard/my-donation-requests'
        />
        <MenuItem
          icon={FaEdit}
          label='Create Donation Request'
          address='/dashboard/create-donation-request'
        />       
      </>
    )
}

export default DonarMenu