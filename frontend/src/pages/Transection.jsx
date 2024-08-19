import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import JSConfetti from 'js-confetti'
const Transection = () => {
    const { id } = useParams();
    const location = useLocation();
    const { bgcolor, firstName, lastName } = location.state || {};
    const jsConfetti = new JSConfetti()
    const [successful, setsuccessful] = useState(false)

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const onSubmit = async (formdata) => {
        const data = { amount: parseInt(formdata.amount), to: id };

        try {
            const response = await axios.post(
                "http://localhost:3000/api/account/transfer",
                data,
                { withCredentials: true }
            );
            setsuccessful(true)
            jsConfetti.addConfetti()
            setTimeout(() => {
                navigate("/dashboard")
            }, [2000]);
            // Handle success, you can display a message or redirect
            // console.log('Transaction successful:', response.data);
        } catch (error) {
            // Extract the error message from the backend response
            const errorMessage = error.response.data.msg || 'Transaction failed';

            // Use setError to display the error message on the form
            setError('amount', { type: 'manual', message: errorMessage });
        }
    };

    return (
        <div className='w-full h-custom flex justify-center items-center'>
{
    successful ?(
        <div className="">
            <h1 className='text-5xl font-semibold'>Payment successful</h1>
        </div>

    ):(
        <div className="bg-white flex flex-col gap-4 items-center rounded-md h-[40] w-[35%]">
        <h1 className='text-2xl font-semibold'>Send Money</h1>
        <div className="w-full px-6">
            <div className="flex items-center gap-2 w-full">
                <div
                    className="flex justify-center cursor-pointer items-center w-16 h-16 rounded-full text-white text-xl"
                    style={{ backgroundColor: bgcolor }}
                >
                    {firstName.charAt(0)}
                </div>
                <h3 className='text-2xl'>{firstName} {lastName}</h3>
            </div>
            <h3 className='opacity-75 font-semibold mb-2'>Amount (in Rupees)</h3>
            <form className=' flex flex-col  gap-2' onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="number"
                    placeholder="Enter amount"
                    {...register('amount', {
                        required: 'Amount is required',
                        min: {
                            value: 0,
                            message: 'Amount should be at least 0',
                        },
                    })}
                    className="border rounded px-4 py-2 w-full"
                />
                {errors.amount && <p className="text-red-600">{errors.amount.message}</p>}
                <button type="submit" className="bg-green-500 mb-4  w-full  text-white rounded px-4 py-2 mt-4">Initiate Transaction</button>
            </form>
        </div>
    </div>
    )
}
        </div>
    );
};

export default Transection;
