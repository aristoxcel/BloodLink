import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Authentication/hooks/useAxiosPublic";
import useAuth from "../Authentication/hooks/useAuth";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const image_hosting_key = d9517916345f9c439c21191c892aec3e;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

function Profile() {
  const axiosPublic = useAxiosPublic();
  const { user, updateUserProfile } = useAuth();
  let [isOpen, setIsOpen] = useState(false);
  // -----------------------------------

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    console.log(data, 'hit korse');
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    updateUserProfile(data.name, res.data.data.display_url).then(() => {
      const userData = {
        name: data.name,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
        image: res.data.data.display_url,
      };
      axiosPublic.put(`/user?email=${user?.email}`, userData).then((res) => {
        
          console.log(res.data, 'hi');

      });
    });
  };
  //   ----------------------------------------

  const { data: donar = "" } = useQuery({
    queryKey: ["donar"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/donar?email=${user.email}`);
      return res.data;
    },
  });
  console.log(donar[0]);

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="w-4/5 relative">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-[#F43F5E] px-6 py-2 rounded-lg text-white cursor-pointer hover:bg-[#af4053]"
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
                      placeholder={donar[0]?.name}
                      {...register("name", { required: true })}
                      autoComplete="name"
                      name="name"
                      className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                      type="text"
                    />
                    {errors.name && <span>Please Enter Your Name</span>}
                  </div>

                  <div className="flex justify-between items-center gap-3">
                    <div className="mt-4 w-full">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-600 "
                        htmlFor="image"
                      >
                        Your Photo
                      </label>
                      <input
                        placeholder="Profile Image"
                        autoComplete="image"
                        {...register("image", { required: true })}
                        name="image"
                        className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                        type="file"
                      />
                    </div>

                    <div className="mt-4  w-full">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-600 "
                        htmlFor="email"
                      >
                        Blood Group
                      </label>
                      <div className=" w-full block px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'">
                        <select
                          defaultValue={donar[0]?.bloodGroup}
                          {...register("bloodGroup", { required: true })}
                          className="select  w-full"
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
                        <option value="">{donar[0]?.district}</option>
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
                        <option value="">{donar[0]?.upazila}</option>
                        {upazilas.map((upazila) => (
                          <option key={upazila} value={upazila}>
                            {upazila}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-4">
                  <button type='submit' className="text-xl" >Save</button>
           
                </div>
                </form>
              </DialogPanel>
            </div>
          </Dialog>
        </div>

        <div className="bg-white shadow-lg rounded-2xl">
          <img
            alt="profile-banner"
            src={"https://i.ibb.co/n3LtdQd/banner2.jpg"}
            className="w-full rounded-t-2xl h-48 object-cover"
          />
          <div className="relative flex justify-center -mt-16">
            <img
              alt="profile"
              src={donar[0]?.image || user?.photoURL}
              className="object-cover rounded-full h-24 w-24 border-4 border-white"
            />
          </div>
          <div className="text-center mt-6">
            <p className="inline-block px-4 py-1 text-xs font-semibold text-white bg-[#F43F5E] rounded-full uppercase">
              {donar[0]?.role}
            </p>
            <h2 className="mt-2 text-xl font-bold text-gray-800">
              {donar[0]?.name}
            </h2>
          </div>
          <div className="flex flex-col items-center p-6 mt-4">
            <div className="w-full">
              <div className="flex flex-wrap justify-between text-gray-600 mb-4">
                <div className="w-1/2 mb-4">
                  <span className="block font-medium">Name</span>
                  <span className="font-bold text-black">{donar[0]?.name}</span>
                </div>
                <div className="w-1/2 mb-4">
                  <span className="block font-medium">Email</span>
                  <span className="font-bold text-black">{user?.email}</span>
                </div>
                <div className="w-1/2 mb-4">
                  <span className="block font-medium">Blood Group</span>
                  <span className="font-bold text-black">
                    {donar[0]?.bloodGroup}
                  </span>
                </div>
                <div className="w-1/2 mb-4">
                  <span className="block font-medium">Location</span>
                  <span className="font-bold text-black">
                    {donar[0]?.district}, {donar[0]?.upazila}
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
