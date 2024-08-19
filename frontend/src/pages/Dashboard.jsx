import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const Dashboard = () => {
  const [Balance, setBalance] = useState(null);
  const [val, setval] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Use useNavigate to navigate to other routes

  const getBalance = async () => {
    try {
      const response = await axios.get('https://payu-paytm.onrender.com/api/account/balance', {
        withCredentials: true,
      });

      let balval = response.data.balance.balance.toString().split('.')[0];
      setBalance(balval);
    } catch (err) {
      console.log(err);
    }
  };

  const getUsers = async (filter) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/auth/user/bulk`, {
        params: { filter },
        withCredentials: true,
      });
      setUsers(response.data.users);
      console.log(response.data.users);
      
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    getBalance();
  }, []);

  useEffect(() => {
    getUsers(val);
  }, [val]);

  const navigatefnc = (id,bgcolor,firstName,lastName) => {
    // Navigate to a route with the user's id
    navigate(`/transection/${id}`,{
        state: { bgcolor, firstName, lastName },
    });

  };  return (
    <div className='h-custom w-full px-8 select-none'>
      {Balance ? (
        <h1 className='text-2xl font-base'>Your Balance: ₹ {Balance}</h1>
      ) : (
        <p>Loading balance...</p>
      )}

      <h1 className='text-2xl font-semibold'>Users:</h1>
      <form>
        <input  className='w-full h-14 px-4 outline-none rounded-md'
          onChange={(event) => setval(event.target.value)} 
          type="text" 
          placeholder="Search Users" 
        />
      </form>
      <div className='gap-2 flex flex-col mt-2'>
        {users.map((user, index) => (
          <div key={index} className="flex justify-between h-20 items-center border-white border-4 px-2 rounded-md">

            <div className="flex gap-2 items-center">
            <div
              className="flex justify-center cursor-pointer items-center w-10 h-10 rounded-full text-white text-xl"
              style={{ backgroundColor: user.bgcolor }}
            >
              {user.firstName.charAt(0)}
            </div>
           <div className="">
           <h1 className='text-xl'>{user.firstName} {user.lastName}</h1>
           <h2 className='text-base opacity-80'>{user.email}</h2>
           </div>
            </div>
            <button onClick={() => navigatefnc(user._id, user.bgcolor, user.firstName, user.lastName)}  className='bg-slate-800 text-white h-10 px-2 rounded-md'>Send money</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
