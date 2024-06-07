import useRole from "../Authentication/hooks/useRole"
import LoadingSpinner from "../Components/LoadingSpinner"


function DashHome() {
    const [role, isLoading] = useRole()
    if (isLoading) return <LoadingSpinner />
    return (
      <>
        {/* {role === 'admin' && <AdminStatistics />}
        {role === 'host' && <HostStatistics />}
        {role === 'guest' && <GuestStatistics />} */}
      </>
    )
}

export default DashHome