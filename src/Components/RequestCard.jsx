import { Link } from "react-router-dom"


function RequestCard({req, refetch}) {
    const {status, recipient, district, upazila, date, time, _id, bloodGroup}=req
  return (
    <div className="flex max-w-md overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
    <div className="w-1/3 bg-cover" style={{ backgroundImage: `url('https://i.ibb.co/1mmhpgJ/people-icon-sign-symbol-design-free-png.webp')` }} alt="Profile" />
    <div className="w-2/3 p-4 md:p-4">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white leading-tight">{recipient}</h1>
      <p className="mt-2 text-lg font-semibold text-gray-600 dark:text-gray-400 leading-tight">
        Required Blood Group: <span className="text-red-600 font-bold">{bloodGroup}</span>
      </p>
      <p className="mt-2 text-lg font-semibold text-gray-600 dark:text-gray-400 leading-tight">
        Location: <span className="text-sm">{district}, {upazila}</span>
      </p>
      <p className="mt-2 text-lg font-semibold text-gray-600 dark:text-gray-400 leading-tight">
        Date & Time: <span className="text-sm">{date}, {time}</span>
      </p>
      <div className="flex justify-between mt-3 items-center">
        <Link to={`/donationDetailPublic/${_id}`}><button className="px-4 py-2 text-sm font-bold text-white uppercase transition-colors duration-300 transform bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
          View Details
        </button></Link>
      </div>
    </div>
  </div>
  )
}

export default RequestCard