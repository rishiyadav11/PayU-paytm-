import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';


const Signup = ({onRegister}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const onSubmit = async(data) => {
    // console.log(data);
    try {
      const response = await axios.post('https://payu-paytm.onrender.com/api/auth/signup', data,{  withCredentials: true,});
      // const { msg, already } = response.data;
      // console.log(msg, already)
       onRegister()
      navigate("/dashboard")
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="flex justify-center w-full h-screen items-center bg-lime-200"> 
      <div className="bg-white h-auto flex flex-col gap-6 items-center rounded-md w-[30%] py-8 shadow-lg">
        <h1 className="text-2xl font-semibold">Sign Up</h1>
        <h3 className="text-lg font-semibold text-gray-500 text-center px-4">
          Enter your information to create a new account
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full px-8 flex flex-col gap-4">
          {/* First Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">First Name</label>
            <input
              {...register('firstname', { required: 'First Name is required' })}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your first name"
            />
            {errors.firstname && (
              <span className="text-red-500 text-sm mt-1">
                {errors.firstname.message}
              </span>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Last Name</label>
            <input
              {...register('lastname', { required: 'Last Name is required' })}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your last name"
            />
            {errors.lastname && (
              <span className="text-red-500 text-sm mt-1">
                {errors.lastname.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Email</label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Enter a valid email address',
                },
              })}
              className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium">Password</label>
            <div className="relative w-full">
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                })}
                type={showPassword ? 'text' : 'password'}
                className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-2 top-4 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash/> : <FaEye/>}
              </button>
            </div>

            {errors.password && (
              <span className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
        <h2 className='text-xl font-medium'>Already have an account <NavLink className="text-blue-600 underline" to="/login">Login</NavLink></h2>
      </div>
    </div>
  );
};

export default Signup;
