import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "./hooks/useAuth";
import { useState } from "react";





function Login() {
  const { signIn } = useAuth();
  const [registers, setRegisters] = useState(false);
const [error, setError]= useState(null);
const [success, setSuccess]=useState(null)
const navigate = useNavigate()
const location = useLocation()
const from = location?.state || '/';


const {
    register,
    handleSubmit,
    reset,
    formState: { errors }, 
  } = useForm()


      // login Submit function
      const loginData = (data) => {
        setError('')
        setSuccess('')
        console.log(data);
        signIn(data.email, data.password)
        .then(()=>{
            setSuccess('you logged in successfully')
            Swal.fire({
              icon: "success",
              title: "you logged in successfully",
              showConfirmButton: false,
              timer: 1500
            });
          navigate(from, {replace:true});
        })
        .catch(()=>{setError('Email or Password is not matching')
                Swal.fire({
                  icon: "error",
                  title: `${error}`,
                  showConfirmButton: false,
                  timer: 1500
                });
      })
        reset()
      }
      console.log(errors);


  return (
    <div className="w-80 md:w-96 lg:w-[800px] mx-auto bg-white flex items-center relative overflow-hidden shadow-xl my-6" style={{
      backgroundImage: `url(${'banner4.png'})`,
    }}>
                      {/* login form */}
                <form className={`p-8 w-full mr-0 ml-auto duration-500 ${registers ? 'lg:translate-x-full hidden lg:block' : ''}`} onSubmit={handleSubmit(loginData)}>
                    <h1 className="backdrop-blur-sm text-center text-2xl lg:text-4xl pb-4 text-violet-600">Login</h1>
                    <div className="space-y-5">
                        <label htmlFor="_email" className="block text-violet-600">Email</label>
                        <input 
                            className='p-3 block w-full outline-none border rounded-md invalid:border-red-700 valid:border-black' 
                            type="email" 
                            placeholder="Email" 
                            {...register("email", {required:
                            {value:true,
                            message:"This is required"} , pattern: /^\S+@\S+$/i})} 
                            aria-invalid={errors.email ? "true" : "false"} />
                        {errors.email && <p className="text-red-500 font-semibold">{errors.email.message}</p>}
                


                        <label htmlFor="_password" className="block text-violet-600">Password</label>
                        <input className='p-3 block w-full outline-none border border-[#c4052b] rounded-md invalid:border-red-700 valid:border-black' 
                                type="password" 
                                placeholder="Password" 
                                {...register("password", 
                                {required: {
                                value:true,
                                message:"This is required"}
                                }
                            )} 
                                aria-invalid={errors.Password ? "true" : "false"}/>
                                {errors.password  && <p className="text-red-500 font-semibold">{errors.password.message}</p>}

                    </div>
                    {/* button type will be submit for handling form submission*/}
                    <button type="submit" className="w-full px-5 mb-2 mx-auto mt-4 shadow-lg rounded-md   block group relative h-10 overflow-hidden border-2  text-xl text-sky-400 bg-[#c4052b] hover:text-sky-200"><span className="bg-sky-800  ease-in absolute w-[57%]  -translate-x-full group-hover:translate-x-0 -left-2 top-0 bottom-0 duration-300 -z-10 skew-x-12"></span><span className="bg-sky-600 ease-in absolute w-[55%]  translate-x-full group-hover:translate-x-0 -right-2 top-0 bottom-0 duration-300 skew-x-12 -z-10"></span>Submit</button>
                    <p className="mb-3 text-center text-black font-roboto font-bold">Don&apos;t have an account? <Link to={'/SignUp'} onClick={() => {setRegisters(!registers);}} className="underline font-semibold text-base-600">Register</Link></p>
                    <hr />

                </form>
            </div>
  )
}

export default Login