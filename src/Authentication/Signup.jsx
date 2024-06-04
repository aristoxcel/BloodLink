import {  useEffect, useState} from "react";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "./hooks/useAuth";
import useAxiosPublic from "./hooks/useAxiosPublic";
import Swal from "sweetalert2";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const image_hosting_key = d9517916345f9c439c21191c892aec3e;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


function Signup() {

    const {createUser} = useAuth()
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()




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






  const onSubmit =async (data) =>{
    console.log(data)
    const imageFile = { image: data.image[0] }
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
          'content-type': 'multipart/form-data'
      }
  });
    if(data.password === data.confirmPassword){
      createUser(data.email, data.password)
      .then(result =>{
        console.log(result.user)
        const userData = {
          name: data.name,
          email: data.email,
          bloodGroup: data.bloodGroup,
          district: data.district,
          upazila: data.upazila,
          image: res.data.data.display_url,
          role: "donar"
      }
       axiosPublic.post('/user', userData)
        .then(res=>{
          if(res.data.insertedId){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "you registered successfully",
              timer: 1500
            });
              navigate('/login');
          }

        })
      })
      .catch(error =>console.log(error));
      console.log(res.data)
    }
  }


  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-99px)] bg-cover bg-no-repeat ' style={{
      backgroundImage: `url(${'banner4.png'})`,
    }}>
      <div className='flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl shadow-stone-200'>
        <div className='w-full px-6 py-8 md:px-8'>

          <p className='mt-3 text-xl text-center text-gray-600 '>
            Get Your Free Account Now.
          </p>

          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b  lg:w-1/4'></span>

            <div className='text-xs text-center text-gray-500 uppercase  hover:underline'>
              Registration with email
            </div>

            <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mt-4'>
              <label
                className='block mb-2 text-sm font-medium text-gray-600 '
                htmlFor='name'
              >Your Name</label>
              <input
                id='name'
                {...register("name", {required: true})}
                autoComplete='name'
                name='name'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='text'
              />{errors.name && <span>Please Enter Your Name</span>}
            </div>
            <div className='mt-4'>
              <label
                className='block mb-2 text-sm font-medium text-gray-600 '
                htmlFor='email'
              >Your Email</label>
              <input
                id='email'
                {...register("email", {required:true})}
                autoComplete='email'
                name='email'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='text'
              />{errors.email && <span>Please Enter Your Email</span>}
            </div>
            
            <div className='flex justify-between items-center gap-3'> 
            <div className='mt-4 w-full'>
            <label
                className='block mb-2 text-sm font-medium text-gray-600 '
                htmlFor='image'
              >Your Photo</label>
              <input
                placeholder="Profile Image"
                autoComplete='image'
                {...register("image", {required:true})}
                name='image'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='file'
              />
            </div>

            <div className="mt-4  w-full">
            <label
                className='block mb-2 text-sm font-medium text-gray-600 '
                htmlFor='email'
              >Blood Group</label>
            <div className=" w-full block px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'">
            <select defaultValue="default" {...register('bloodGroup', { required: true })}
              className="select  w-full">
              <option disabled value="default">Your Blood Group</option>
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


            <div>
            <label htmlFor="district">District:</label>
      <select
        id="district"
        name="district"
        value={selectedDistrict}
        {...register("district", {required: true})}
        onChange={(e) => setSelectedDistrict(e.target.value)}

      >
        <option value="">Select District</option>
        {districts.map(district => (
          <option key={district.name} value={district.name}>{district.name}</option>
        ))}
      </select>

      <label htmlFor="upazila">Upazila:</label>
      <select
        id="upazila"
        name="upazila"
        value={selectedUpazila}
        {...register("upazila", {required: true})}
        onChange={(e) => setSelectedUpazila(e.target.value)}
      >
        <option value="">Select Upazila</option>
        {upazilas.map(upazila => (
          <option key={upazila} value={upazila}>{upazila}</option>
        ))}
      </select>
            </div>

            <div className="flex gap-3">
            <div className='mt-4 w-full'>
              <div className='flex justify-between'>
                <label
                  className='block mb-2 text-sm font-medium text-gray-600 '
                  htmlFor='loggingPassword'
                >
                  Password
                </label>
              </div>

              <input
                {...register('password', { required: true })}
                autoComplete='current-password'
                name='password'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='password'
              />{errors.password && <span>Please Enter Your Password</span>}
            </div>
            <div className='mt-4 w-full'>
              <div className='flex justify-between'>
                <label
                  className='block mb-2 text-sm font-medium text-gray-600 '
                  htmlFor='confirmPassword'
                >
                  Confirm Password
                </label>
              </div>

              <input
                {...register('confirmPassword', { required: true })}
                autoComplete='current-password'
                name='confirmPassword'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='password'
              />{errors.confirmPassword && <span>Please Confirm Your Password</span>}
            </div>
            </div>
            <div className='mt-6'>
              <button
                type='submit'
                className='w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b  md:w-1/4'></span>

            <Link
              to='/login'
              className='text-xs text-gray-500 uppercase  hover:underline'
            >
              or Log In
            </Link>

            <span className='w-1/5 border-b  md:w-1/4'></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup