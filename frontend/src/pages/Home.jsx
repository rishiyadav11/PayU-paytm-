import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = ({isAuthenticated, email}) => {
  const handleCopyToClipboard = () => {
    if (email) {
      navigator.clipboard.writeText(email).then(() => {
        alert("Email copied to clipboard!");
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    }
  };
  return (
    <div className="">
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="https://assetscdn1.paytm.com/images/catalog/view_item/728702/1626342071104.png"
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Pay anyone directly 
              <br className="hidden lg:inline-block" />
              from your bank account.
            </h1>
            <p className="mb-8 leading-relaxed">
            Pay anyone, everywhere. Make contactless & secure payments in-stores or online using Paytm UPI or Directly from your Bank Account. Plus, send & receive money from anyone.
            </p>
            <div className="flex justify-center">
              
              {
                isAuthenticated ? (
                  <NavLink to="/dashboard" className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
               Send Money
              </NavLink>
                ):(
                  <NavLink to="/signup" className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Get started
                 </NavLink>
                )
              }

{
                isAuthenticated ? (
                  <button onClick={()=>handleCopyToClipboard()}className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                  Receive Money
                  </button>
                ):(
                  <NavLink to="/signup" className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                  Receive Money
                 </NavLink>
                )
              }
              <button >
                
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
