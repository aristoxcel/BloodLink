import { useEffect, useState } from "react";
import useAxiosPublic from "../Authentication/hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../Authentication/hooks/useAuth";


function DonationDetailPublic() {
    const {user}=useAuth()
    const { id } = useParams();
    const axiosPublic = useAxiosPublic()
    const [requestDetails, setRequestDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState("");


    useEffect(() => {
        // Fetch request details from the server
        axiosPublic.get(`/donDetails/${id}`)
          .then(response => {
            setRequestDetails(response.data);
            setStatus(response.data.status);
          })
          .catch(error => {
            console.error('Error fetching request details:', error);
          });
      }, [id, axiosPublic]);

    if (!requestDetails) {
        return <LoadingSpinner/>;
      }
      console.log(requestDetails)
      const {name, email, recipient, bloodGroup, date, time, district, upazila, hospital, address, msg}= requestDetails


      const handleConfirmDonation = () => {
        axiosPublic.put(`/donDetails/${id}`, { status: "inprogress" })
          .then(response => {
            setStatus("inprogress");
            setIsModalOpen(false);
          })
          .catch(error => {
            console.error('Error updating donation status:', error);
          });
      };
    
    return (
        <div className="container mx-auto p-4 pt-14">
          <h1 className="text-3xl font-bold mb-4">Blood Donation Request Details</h1>
          <div className="bg-white shadow-md rounded-lg p-6 mb-4">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Requester Information</h2>
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Email:</strong> {email}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Recipient Information</h2>
              <p><strong>Name:</strong> {recipient}</p>
              <p><strong>Blood Group:</strong> {bloodGroup}</p>
              <p><strong>Date of Blood Receipt:</strong> {date}</p>
              <p><strong>Time of Blood Receipt:</strong> {time}</p>
              <p><strong>Location:</strong> {district}, {upazila}</p>
              <p><strong>Hospital Name:</strong> {hospital}</p>
              <p><strong>Address:</strong> {address}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Request Message</h2>
              <p>{msg}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Status</h2>
              <p>{status}</p>
            </div>
          </div>
          <button
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-300"
        onClick={() => setIsModalOpen(true)}
      >
        Donate
      </button>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <DialogPanel className="w-full max-w-md bg-white rounded-lg p-6">
            <DialogTitle className="text-lg font-bold">Confirm Donation</DialogTitle>
            <form onSubmit={handleConfirmDonation}>
              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-600">Donor Name</label>
                <input
                  type="text"
                  readOnly
                  value={user?.displayName || ""}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-600">Donor Email</label>
                <input
                  type="email"
                  readOnly
                  value={user?.email || ""}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  Confirm Donation
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
        </div>
      );
}

export default DonationDetailPublic