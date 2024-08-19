import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = ({ handleLogout, data }) => {
  console.log(data)
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogoutClick = async () => {
    try {
      await handleLogout(); // Call the passed in handleLogout function
      navigate("/login");
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };




 
  return (
    <div className='h-custom w-full flex items-center justify-center bg-lime-200'>
      <div className="bg-white p-4 h-[35%] w-[30%] bg-opacity-10 backdrop-blur-md border  border-gray-200 border-opacity-30 rounded-lg shadow-lg">
        <div className="flex gap-6  items-center">
          <div style={{ backgroundColor: data.bgcolor }} className={`flex justify-center cursor-pointer items-center w-32 h-32  rounded-full text-white text-xl`}>
            {data.firstname.charAt(0) }
          </div>
          <div>
            <h2 className='font-semibold text-3xl text-black'>{data.firstname} {data.lastName}</h2>
            <h3 className='font-medium opacity-70 text-black'>{data.email}</h3>
          </div>
        </div>
        <div className="h-20 flex items-center justify-center">
          <button 
            id='logoutbtn' 
            onClick={handleLogoutClick} 
            className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
