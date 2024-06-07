import useRole from "../Authentication/hooks/useRole"
import LoadingSpinner from "../Components/LoadingSpinner"
import AdminHome from "./AdminDashboard/AdminHome"
import DonorHome from "./DonarDashboard/DonorHome"
import VolunteerHome from "./VolunteerDashvoard/VolunteerHome"


function DashHome() {
    const [role, isLoading] = useRole()
    if (isLoading) return <LoadingSpinner />
    return (
      <>
        {role === 'admin' && <AdminHome />}
        {role === 'volunteer' && <VolunteerHome />}
        {role === 'donar' && <DonorHome />}
      </>
    )
}

export default DashHome