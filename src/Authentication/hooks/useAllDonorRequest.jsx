import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


function useAllDonorRequest() {
    const {user}=useAuth()
    const axiosSecure= useAxiosSecure()
    
    const {data: donorReq = [], refetch, isLoading } = useQuery({
        queryKey: ['donorReq'], 
        queryFn: async() =>{
          const res = await axiosSecure.get(`/donorReq`);
            return res.data;
        }
    }) 
    return {donorReq, refetch, isLoading}
}

export default useAllDonorRequest

