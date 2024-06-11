
import LoadingSpinner from "../../Components/LoadingSpinner";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Authentication/hooks/useAxiosSecure";
import DonarData from "../DonarDashboard/DonarData";
import useAllDonorRequest from "../../Authentication/hooks/useAllDonorRequest";
import useRole from "../../Authentication/hooks/useRole";

function AllBloodDonationReq() {
  const [role]=useRole()
  const axiosSecure = useAxiosSecure()
   const {donorReq, refetch, isLoading} = useAllDonorRequest()


   const handleDelete=(id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
  }).then((result) => {
      if (result.isConfirmed) {

          axiosSecure.delete(`/donorRequest/${id}`)
              .then(res => {
                  if (res.data.deletedCount > 0) {
                      refetch();
                      Swal.fire({
                          title: "Deleted!",
                          text: "Your Request has been deleted.",
                          icon: "success"
                      });
                  }
              })
      }
  });
   }


    if(isLoading) return <LoadingSpinner/>
  return (
    <>
    <div className='container mx-auto px-4 sm:px-8'>
      {/* <Helmet>
        <title>Manage Users</title>
      </Helmet> */}
      <h1 className="text-3xl font-bold font-roboto text-center">All Donation Request</h1>
      <div className='py-8'>
        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
            <table className='min-w-full leading-normal  mb-16'>
              <thead>
                <tr>
                <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Recipient Name
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Recipient Location
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Donation Date
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Donation Time
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Status
                  </th>

                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Action
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Donar Name
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Donar Email
                  </th>
                  {
                    role !=="volunteer" && 
                    <>
                    <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Edit
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Delete
                  </th>
                    </>
                  }
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    View
                  </th>
                </tr>
              </thead>
              <tbody>
                { donorReq &&
                  donorReq.map(user => (
                    <DonarData
                      key={user._id}
                      user={user}
                      refetch={refetch}
                      handleDelete ={handleDelete}
                      role={role}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default AllBloodDonationReq


