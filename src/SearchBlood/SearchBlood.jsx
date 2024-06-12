import { useState, useEffect } from "react";
import useAxiosPublic from "../Authentication/hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";


function SearchBlood() {
  const axiosPublic = useAxiosPublic();
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [donors, setDonors] = useState([]);
  const [found, setFound]=useState(false)

  useEffect(() => {
    // Fetch districts data
    fetch("/distric.json")
      .then((response) => response.json())
      .then((data) => setDistricts(data))
      .catch((error) => console.error("Error fetching districts:", error));
  }, []);

  useEffect(() => {
    if (district) {
      const selectedDistrict = districts.find((d) => d.name === district);
      if (selectedDistrict) {
        setUpazilas(selectedDistrict.upazilas);
      }
    } else {
      setUpazilas([]);
    }
  }, [district, districts]);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosPublic.get(`/donors`, {
        params: { bloodGroup, district, upazila },
        
      });
      setDonors(response.data);
      setFound(true)
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
  };

  return (
    
    <div className="container mx-auto p-4 lg:px-52 pt-14">
      <Helmet>
        <title>BloodLink | Search Blood</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-4">Search Blood Donors</h1>
      <form onSubmit={handleSearch} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700">Blood Group</label>
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Blood Group</option>
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
        <div className="mb-4">
          <label className="block text-gray-700">District</label>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.name} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Upazila</label>
          <select
            value={upazila}
            onChange={(e) => setUpazila(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Upazila</option>
            {upazilas.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#c4052b] text-white rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-700"
        >
          Search
        </button>
      </form>
      {found && <>
        {donors.length > 0 ? (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Donor List</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {donors.map((donor) => (
              <div key={donor._id} className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-xl font-bold">{donor.name}</h3>
                <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
                <p><strong>Location:</strong> {donor.district}, {donor.upazila}</p>
                <p><strong>Email:</strong> {donor.email}</p>
              </div>
            ))}
          </div>
        </div>
      ):
      <div className="flex justify-center text-3xl mt-12">No matching donar found</div>
      }</>
     
      }
    </div>
  );
}

export default SearchBlood;
