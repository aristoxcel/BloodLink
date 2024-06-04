import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "../Authentication/hooks/useAxiosPublic"
import useAuth from "../Authentication/hooks/useAuth"


function Profile() {
    const axiosPublic= useAxiosPublic()
    const {user}= useAuth()
    
    const {data: donar = []} = useQuery({
        queryKey: ['donar'], 
        queryFn: async() =>{
            const res = await axiosPublic.get(`/donar?email=${user.email}`);
            return res.data;
        }
    })

    console.log(donar)
    console.log(user)
  return (
    <div>
        <h1 className="text-4xl font-roboto mb-10">profile</h1>

        {
            donar.map(d=><div key={d._id}>
            <h1>{d.name}</h1>
            <h1>{d.email}</h1>
            <h1>{d.bloodGroup}</h1>
            <h1>{d.district}</h1>
            <h1>{d.upazila}</h1>
            <h1>{d.role}</h1>
            </div>)
        }
    </div>
  )
}

export default Profile