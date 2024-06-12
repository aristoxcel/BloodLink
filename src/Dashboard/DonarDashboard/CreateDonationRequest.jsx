import { useForm } from "react-hook-form";
import useAuth from "../../Authentication/hooks/useAuth";
import useAxiosPublic from "../../Authentication/hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import Swal from "sweetalert2";

function CreateDonationRequest() {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [startDate, setStartDate] = useState(new Date());
  const [value, setValue] = useState('10:00');
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [upazilas, setUpazilas] = useState([]);
  const [selectedUpazila, setSelectedUpazila] = useState('');

  useEffect(() => {
    fetch('/distric.json')
      .then(response => response.json())
      .then(data => setDistricts(data))
      .catch(error => console.error('Error fetching districts:', error));
  }, []);

  useEffect(() => {
    if (selectedDistrict) {
      const district = districts.find(d => d.name === selectedDistrict);
      if (district) {
        setUpazilas(district.upazilas);
      }
    } else {
      setUpazilas([]);
    }
  }, [selectedDistrict, districts]);

  const onSubmit = async (data) => {
    const formattedDate = startDate.toISOString().split('T')[0]; // Extract only the date part
    const request = {
      name: user.displayName,
      email: user.email,
      recipient: data.recipient,
      bloodGroup: data.bloodGroup,
      date: formattedDate,
      time: value,
      district: data.district,
      upazila: data.upazila,
      hospital: data.hospital,
      address: data.address,
      msg: data.msg,
      status: 'Pending'
    };


    const bloodReq = await axiosPublic.post('/donationRequest', request);
    if(bloodReq.data.insertedId){
      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Request for ${data.recipient} has been created.`,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-12">
      <div className="flex justify-between mb-4">
        <div className="text-lg font-semibold">Requester Name: <span className="uppercase">{user?.displayName}</span></div>
        <div className="text-lg font-semibold">Requester Email: {user?.email}</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="recipient">
              Recipient Name
            </label>
            <input
              {...register('recipient', { required: true })}
              placeholder="Patient Name"
              className="mt-1 block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              type="text"
            />
            {errors.recipient && <span className="text-red-500 text-sm">Please enter the recipients name</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="bloodGroup">
              Blood Group
            </label>
            <select
              defaultValue="default"
              {...register('bloodGroup', { required: true })}
              className="mt-1 block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            >
              <option disabled value="default">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            {errors.bloodGroup && <span className="text-red-500 text-sm">Please select a blood group</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="date">
              Pick a date
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="mt-1 block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="timePicker">
              Pick a time
            </label>
            <div >
            <TimePicker className="mt-1 flex gap-3  w-full px-4 py-1 text-gray-700 bg-white border-none rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              onChange={setValue}
              value={value}
            />
        
      </div>
            
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="district">
              District
            </label>
            <select
              id="district"
              name="district"
              value={selectedDistrict}
              {...register("district", { required: true })}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="mt-1 block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            >
              <option value="">Select District</option>
              {districts.map(district => (
                <option key={district.name} value={district.name}>{district.name}</option>
              ))}
            </select>
            {errors.district && <span className="text-red-500 text-sm">Please select a district</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="upazila">
              Upazila
            </label>
            <select
              id="upazila"
              name="upazila"
              value={selectedUpazila}
              {...register("upazila", { required: true })}
              onChange={(e) => setSelectedUpazila(e.target.value)}
              className="mt-1 block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            >
              <option value="">Select Upazila</option>
              {upazilas.map(upazila => (
                <option key={upazila} value={upazila}>{upazila}</option>
              ))}
            </select>
            {errors.upazila && <span className="text-red-500 text-sm">Please select an upazila</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="hospital">
              Hospital
            </label>
            <input
              {...register('hospital')}
              placeholder="If Hospitalized"
              className="mt-1 block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              type="text"
            />
            {errors.hospital && <span className="text-red-500 text-sm">Please enter the hospital name</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="address">
              Full Address
            </label>
            <input
              {...register('address', { required: true })}
              placeholder="Enter full address"
              className="mt-1 block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              type="text"
            />
            {errors.address && <span className="text-red-500 text-sm">Please enter the address</span>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="msg">
            Request Message
          </label>
          <textarea
            {...register('msg')}
            placeholder="Enter your message"
            className="mt-1 block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40"
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#c4052b] rounded-lg hover:bg-red-500 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
          >
            Create Donation Request
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateDonationRequest;