import {  useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../Authentication/hooks/useAxiosSecure";
import {Menu} from '@headlessui/react'



const RoleChange =({userId})=> {
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient();


    const mutation = useMutation({
        mutationFn: async (newRole) => {
            await axiosSecure.patch(`/users/${userId}/role`, { role: newRole });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
          },
        onError: (error) => {
            console.error('Error updating user role:', error);
        },
    });

    const handleRoleChange = (role) => {
        mutation.mutate(role);
    };
  return (
    <Menu as="div" className="relative inline-block text-left z-50 ">
    <div>
        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            ...
        </Menu.Button>
    </div>
    <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-gray-100 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="px-1 py-1">
            <Menu.Item>
                {({ active }) => (
                    <button
                        className={`${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={() => handleRoleChange('volunteer')}
                    >
                        Volunteer
                    </button>
                )}
            </Menu.Item>
            <Menu.Item>
                {({ active }) => (
                    <button
                        className={`${
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={() => handleRoleChange('admin')}
                    >
                        Admin
                    </button>
                )}
            </Menu.Item>
        </div>
    </Menu.Items>
</Menu>

  )
}

export default RoleChange