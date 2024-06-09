import RequestCard from "../Components/RequestCard";
import useAuth from '../Authentication/hooks/useAuth';
import useAxiosPublic from '../Authentication/hooks/useAxiosPublic';
import LoadingSpinner from "../Components/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

function DonationRequest() {
  const {user}=useAuth
  const axiosPublic = useAxiosPublic()

    const {data: allReq = [], refetch, isLoading } = useQuery({
        queryKey: ['allReq'], 
        queryFn: async() =>{
          const res = await axiosPublic.get('/allReq');
            return res.data;
        }
    }) 

    if(isLoading) return <LoadingSpinner/>
  return (
    <>
    <div className='container mx-auto px-4 sm:px-8'>
      {/* <Helmet>
        <title>Manage Users</title>
      </Helmet> */}
      <h1 className="text-3xl font-bold font-roboto text-center">Blood Donation Request</h1>
      <div className='py-8'>
        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-4 lg:gap-6'>
          { allReq &&
                  allReq.map(req => (
                    <RequestCard
                      key={req._id}
                      req={req}
                      refetch={refetch}
                    />
                  ))}
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default DonationRequest
