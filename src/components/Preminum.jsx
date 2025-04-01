import axios from "axios";
import { BASE_URL } from "../utils/constansts";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });

      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
      setIsLoading(false);
    } catch {
      toast.error("Failed to verify premium status");
      setIsLoading(false);
    }
  };

  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        {
          membershipType: type,
        },
        { withCredentials: true }
      );

      const { amount, keyId, currency, notes, orderId } = order.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "Dev Tinder",
        description: "Connect to other developers",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: "",
        },
        theme: {
          color: "#3B82F6", // Changed to match dark theme
        },
        handler: verifyPremiumUser,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      toast.error("Failed to initiate payment");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  return isUserPremium ? (
<div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center text-center px-4">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-24 w-24 text-blue-500 mb-6" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
            clipRule="evenodd" 
          />
        </svg>
        <h1 className="text-3xl font-bold text-white mb-4">
          Premium Membership Active
        </h1>
        <p className="text-gray-400 max-w-md">
          You enjoying all the premium features of DevTinder. 
          Connect, chat, and expand your network without limits!
        </p>
      </div>
  ): (
    <div className="min-h-screen bg-gray-900 py-12 px-4 flex items-center justify-center">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-white mb-12 tracking-wider">
          Unlock Premium Features
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Silver Membership */}
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700 transform transition-all duration-300 hover:scale-105">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Silver Membership
              </h2>
              
              <div className="text-gray-300 mb-6">
                <div className="text-2xl font-bold text-blue-500 mb-4">
                  $9.99
                  <span className="text-sm block text-gray-500">per 3 months</span>
                </div>
                
                <ul className="space-y-3 text-left">
                  <li className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-2 text-blue-500" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    Chat with other developers
                  </li>
                  <li className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-2 text-blue-500" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    100 connection requests per day
                  </li>
                  <li className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-2 text-blue-500" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    Blue verification tick
                  </li>
                </ul>
              </div>
              
              <button
                onClick={() => handleBuyClick("silver")}
                className="btn btn-primary w-full"
              >
                Buy Silver
              </button>
            </div>
          </div>

          {/* Gold Membership */}
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 border border-blue-600 transform transition-all duration-300 hover:scale-105">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Gold Membership
              </h2>
              
              <div className="text-gray-300 mb-6">
                <div className="text-2xl font-bold text-yellow-500 mb-4">
                  $19.99
                  <span className="text-sm block text-gray-500">per 6 months</span>
                </div>
                
                <ul className="space-y-3 text-left">
                  <li className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-2 text-yellow-500" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    Unlimited chat access
                  </li>
                  <li className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-2 text-yellow-500" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    Unlimited connection requests
                  </li>
                  <li className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-2 text-yellow-500" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    Gold verification tick
                  </li>
                </ul>
              </div>
              
              <button
                onClick={() => handleBuyClick("gold")}
                className="btn btn-secondary w-full"
              >
                Buy Gold
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;