import { useQuery } from "@tanstack/react-query";
import UserData from "./UserData";
import useAxiosSecure from "../../Authentication/hooks/useAxiosSecure";


function AllUsers() {

    const axiosSecure= useAxiosSecure()

    const {data: users = [], refetch } = useQuery({
        queryKey: ['users'], 
        queryFn: async() =>{
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

  return (
    <>
    <div className='container mx-auto px-4 sm:px-8'>
      {/* <Helmet>
        <title>Manage Users</title>
      </Helmet> */}
      <div className='py-8'>
        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
            <table className='min-w-full leading-normal mb-20'>
              <thead>
                <tr>
                <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Avatar
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Email
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Name
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                  >
                    Role
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
                    Change Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map(user => (
                    <UserData
                      key={user._id}
                      user={user}
                      refetch={refetch}
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

export default AllUsers