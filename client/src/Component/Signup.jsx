import React from "react";


import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import { useAuth } from "../Context/authProvider";
function Signup() {
  const [authUser, setAuthUser]=useAuth();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async(data)=>{
   
    axios.post('http://localhost:8080/user/signup', data, { withCredentials: true })
    .then((response) => {
      localStorage.setItem('messenger', JSON.stringify(response.data) );
      setAuthUser(response.data);
      toast.success(response.data.message);
    
    }).catch((error) => {
      console.log(error);
      toast.error(error.response.data.message);

    });
      

  }
 
  const password = watch("password");
  const validatePassword=(value)=>{
    if(password!==value) return "Passwords do not match";
  }

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <form
         onSubmit={handleSubmit(onSubmit)}
          className="border border-black px-6 py-2 rounded-md space-y-3 w-96"
        >
          <h1 className="text-2xl items-center text-blue-600 font-bold">
            Messenger
          </h1>

          <h2 className="text-2xl items-center">
            Create a new{" "}
            <span className="text-blue-600 font-semibold">Account</span>
          </h2>
         
          {/* Fullname */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Fullname"
              {...register("username", { required: true })}
            />
          </label>
          {errors.username && <span className="text-red-500 text-sm font-semibold">This field is required</span>}
          {/* Email */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              className="grow"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </label>
          {errors.email && (
            <span className="text-red-500 text-sm font-semibold">
              This field is required
            </span>
          )}

          {/* Password */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="password"
              {...register("password", { required: true })}
            />
          </label>
          {errors.password && (
            <span className="text-red-500 text-sm font-semibold">
              This field is required
            </span>
          )}

          {/*Confirm Password */}
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="confirm password"
              {...register("conformPassword", { required: true,validate:validatePassword}) }
             
            />
          </label>
          {errors.confirmpassword && (
            <span className="text-red-500 text-sm font-semibold">
             {errors.confirmpassword.message || "This field is required"}
            </span>
          )}
          {/* Text & Button */}
          <div className="flex justify-center">
              <input
                type="submit"
                value="Signup"
                className="text-white bg-blue-600 cursor-pointer w-full rounded-lg py-2"
              ></input>
            </div>
            <p>
              Have any Account?{" "}
              <Link
                to={"/login"}
                className="text-blue-500 underline cursor-pointer ml-1"
              >
                {" "}
                Login
              </Link>
            </p>
        </form>
      </div>
    </>
  );
}

export default Signup;