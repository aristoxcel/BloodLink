import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Authentication/hooks/useAxiosPublic";
import useAuth from "../Authentication/hooks/useAuth";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../Components/LoadingSpinner";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

function Profile() {
  const axiosPublic = useAxiosPublic();
  const { user, updateUserProfile } = useAuth();
  let [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [selectedUpazila, setSelectedUpazila] = useState("");

  useEffect(() => {
    fetch("/distric.json")
      .then((response) => response.json())
      .then((data) => setDistricts(data))
      .catch((error) => console.error("Error fetching districts:", error));
  }, []);

  useEffect(() => {
    if (selectedDistrict) {
      const district = districts.find((d) => d.name === selectedDistrict);
      if (district) {
        setUpazilas(district.upazilas);
      }
    } else {
      setUpazilas([]);
    }
  }, [selectedDistrict, districts]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const res = await axiosPublic.post(image_hosting_api, formData);
      const imageUrl = res.data.data.display_url;

      await updateUserProfile(data.name, imageUrl);

      const userData = {
        name: data.name,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
        image: imageUrl,
      };

      const updateRes = await axiosPublic.put(`/user/${user?.email}`, userData);
      
      
      console.log(updateRes.data);
      if(updateRes.data.modifiedCount>0){
        refetch()
        Swal.fire({
          icon: "success",
          title: "you logged in successfully",
          showConfirmButton: false,
          timer: 1500
        });
        
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const { data: donor = [], refetch } = useQuery({
    queryKey: ["donor"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/donar?email=${user.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (donor.length > 0) {
      reset(donor[0]);
      setSelectedDistrict(donor[0].district);
      setSelectedUpazila(donor[0].upazila);
    }
  }, [donor, reset]);

  if (!donor.length) return <LoadingSpinner/>;


  return (
    <div className="flex flex-col items-center mt-10">
      <div className="w-4/5 relative">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-[#c4052b] px-6 py-2 rounded-lg text-white cursor-pointer hover:bg-[#F43F5E]"
          >
            Edit Profile
          </button>

          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
          >
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
              <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                <DialogTitle className="font-bold">Edit Profile</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mt-4">
                    <input
                      id="name"
                      placeholder={user?.displayName}
                      {...register("name", { required: true })}
                      autoComplete="name"
                      name="name"
                      className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                      type="text"
                    />
                    {errors.name && <span>Please Enter Your Name</span>}
                  </div>

                  <div className="flex justify-between items-center gap-3">
                    <div className="mt-4 w-full">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-600"
                        htmlFor="image"
                      >
                        Your Photo
                      </label>
                      <input
                        placeholder="Profile Image"
                        autoComplete="image"
                        {...register("image", { required: true })}
                        name="image"
                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                        type="file"
                      />
                    </div>

                    <div className="mt-4 w-full">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-600"
                        htmlFor="bloodGroup"
                      >
                        Blood Group
                      </label>
                      <div className="w-full block px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300">
                        <select
                          defaultValue={donor[0]?.bloodGroup}
                          {...register("bloodGroup", { required: true })}
                          className="select w-full"
                        >
                          <option disabled value="default">
                            Your Blood Group
                          </option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center gap-3 mt-3">
                    <div className="w-full px-4 py-2 text-gray-700 bg-white border rounded-lg flex">
                      <label htmlFor="district">District:</label>
                      <select
                        id="district"
                        name="district"
                        value={selectedDistrict}
                        {...register("district", { required: true })}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                      >
                        <option value="">{donor[0]?.district}</option>
                        {districts.map((district) => (
                          <option key={district.name} value={district.name}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="w-full flex px-4 py-2 text-gray-700 bg-white border rounded-lg">
                      <label htmlFor="upazila">Upazila:</label>
                      <select
                        id="upazila"
                        name="upazila"
                        value={selectedUpazila}
                        {...register("upazila", { required: true })}
                        onChange={(e) => setSelectedUpazila(e.target.value)}
                      >
                        <option value="">{donor[0]?.upazila}</option>
                        {upazilas.map((upazila) => (
                          <option key={upazila} value={upazila}>
                            {upazila}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <button
                      type="submit"
                      className="bg-[#c4052b] text-white px-4 py-2 rounded-lg hover:bg-blue-400"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </div>
          </Dialog>
        </div>

        <div className="bg-white shadow-lg rounded-2xl">
          <img
            alt="profile-banner"
            src="https://i.ibb.co/n3LtdQd/banner2.jpg"
            className="w-full rounded-t-2xl h-48 object-cover"
          />
          <div className="relative flex justify-center -mt-16">
            <img
              alt="profile"
              src={donor[0]?.image || user?.photoURL}
              className="object-cover rounded-full h-24 w-24 border-4 border-white"
            />
          </div>
          <div className="text-center mt-6">
            <p className="inline-block px-4 py-1 text-xs font-semibold text-white bg-[#F43F5E] rounded-full uppercase">
              {donor[0]?.role}
            </p>
            <h2 className="mt-2 text-xl font-bold text-gray-800">
              {user?.displayName}
            </h2>
          </div>
          <div className="flex flex-col items-center p-6 mt-4">
            <div className="w-full">
              <div className="flex flex-wrap justify-between text-gray-600 mb-4">
                <div className="w-1/2 mb-4">
                  <span className="block font-medium">Name</span>
                  <span className="font-bold text-black">{donor[0]?.name}</span>
                </div>
                <div className="w-1/2 mb-4">
                  <span className="block font-medium">Email</span>
                  <span className="font-bold text-black">{user?.email}</span>
                </div>
                <div className="w-1/2 mb-4">
                  <span className="block font-medium">Blood Group</span>
                  <span className="font-bold text-black">
                    {donor[0]?.bloodGroup}
                  </span>
                </div>
                <div className="w-1/2 mb-4">
                  <span className="block font-medium">Location</span>
                  <span className="font-bold text-black">
                    {donor[0]?.district}, {donor[0]?.upazila}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;