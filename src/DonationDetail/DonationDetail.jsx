import { useEffect, useState } from "react";
import useAxiosPublic from "../Authentication/hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";


function DonationDetail() {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic()
    const [requestDetails, setRequestDetails] = useState(null);
    useEffect(() => {
        // Fetch request details from the server
        axiosPublic.get(`/donDetails/${id}`)
          .then(response => {
            setRequestDetails(response.data);
          })
          .catch(error => {
            console.error('Error fetching request details:', error);
          });
      }, [id, axiosPublic]);

    if (!requestDetails) {
        return <LoadingSpinner/>;
      }
      const {name, email, recipient, bloodGroup, date, time, district, upazila, hospital, address, msg, status}= requestDetails
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
            onClick={() => window.history.back()}
          >
            Back
          </button>
        </div>
      );
}

export default DonationDetail