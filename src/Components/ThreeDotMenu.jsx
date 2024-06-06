import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from '../Authentication/hooks/useAxiosSecure'


const ThreeDotMenu=({ userId, initialStatus })=> {
    const axiosSecure = useAxiosSecure()
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState(initialStatus);
    const queryClient = useQueryClient();
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
    const mutation = useMutation({
        mutationFn: async (newStatus) => {
          return axiosSecure.patch(`/users/${userId}/status`, { status: newStatus });
        },
        onSuccess: () => {
          queryClient.invalidateQueries(['users']);
        },
        onError: (error) => {
          console.error('Error updating user status:', error);
        }
      });
  
    const handleStatusChange = (newStatus) => {
    mutation.mutate(newStatus);
      setStatus(newStatus);
      setIsOpen(false);
    };


  
    return (
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            onClick={toggleMenu}
          >
            •••
          </button>
        </div>
  
        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-56 z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <button
                className={`block px-4 py-2 text-sm text-gray-700 w-full text-left ${status === 'active' ? 'bg-gray-100' : ''}`}
                role="menuitem"
                onClick={() => handleStatusChange('active')}
              >
                Active
              </button>
              <button
                className={`block px-4 py-2 text-sm text-gray-700 w-full text-left ${status === 'blocked' ? 'bg-gray-100' : ''}`}
                role="menuitem"
                onClick={() => handleStatusChange('blocked')}
              >
                Block
              </button>
            </div>
          </div>
        )}
      </div>
    );
}

export default ThreeDotMenu