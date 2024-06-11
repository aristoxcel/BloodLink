import { FaHeart, FaMoneyBillWave, FaUsers } from "react-icons/fa"
import LoadingSpinner from "../../Components/LoadingSpinner"
import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../Authentication/hooks/useAxiosSecure"
import useAuth from "../../Authentication/hooks/useAuth"


function VolunteerHome() {
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()
  const { data: statData = {}, isLoading } = useQuery({
    queryKey: ['statData'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/admin-stat')
      return data
    },
  })

  console.log(statData)
  if (isLoading) return <LoadingSpinner />
 
  return (
    <div className="container mx-auto p-4 pt-14">
    <h1 className="text-3xl font-bold mb-8">Welcome, {user.displayName}!</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
        <FaUsers className="text-4xl text-blue-500" />
        <div>
          <p className="font-semibold pl-8 text-2xl">{statData?.totalUser}</p>
          <p className="text-gray-600">Total Donors</p>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
        <FaMoneyBillWave className="text-4xl text-green-500" />
        <div>
          <p className="text-2xl font-semibold pl-8">${}</p>
          <p className="text-gray-600">Total Funding</p>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
        <FaHeart className="text-4xl text-red-500" />
        <div>
          <p className="text-2xl font-semibold pl-10">{statData?.totalRequest}</p>
          <p className="text-gray-600">Blood Donation Requests</p>
        </div>
      </div>
    </div>
  </div>
);
}

export default VolunteerHome