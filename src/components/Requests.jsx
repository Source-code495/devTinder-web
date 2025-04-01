import axios from "axios";
import { BASE_URL } from "../utils/constansts";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
      toast.success(
        status === "accepted" 
          ? "Connection request accepted!" 
          : "Connection request rejected."
      );
    } catch (err) {
      toast.error("Failed to process request. Please try again.");
      console.error("Request review error", err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/request/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to fetch requests", err);
      setIsLoading(false);
      toast.error("Could not load connection requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center text-center px-4">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-24 w-24 text-gray-600 mb-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" 
          />
        </svg>
        <h1 className="text-3xl font-bold text-gray-300 mb-4">
          No Connection Requests
        </h1>
        <p className="text-gray-500 max-w-md">
          Looks like you don't have any pending connection requests right now. 
          Keep exploring and connecting with developers!
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-white mb-12 tracking-wider">
          Connection Requests
        </h1>

        <div className="space-y-6">
          {requests.map((request) => {
            const { 
              _id, 
              firstName, 
              lastName, 
              photoUrl, 
              age, 
              gender, 
              about 
            } = request.fromUserId;

            return (
              <div 
                key={_id}
                className="bg-gray-800 rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6 border border-gray-700 transform transition-all duration-300 hover:scale-[1.02]"
              >
                {/* User Profile Section */}
                <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-6 space-y-4 md:space-y-0 w-full">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      alt={`${firstName} ${lastName}`}
                      className="w-full h-full rounded-full object-cover ring-4 ring-blue-600"
                      src={photoUrl || `https://ui-avatars.com/api/?name=${firstName}&background=1a1a2e&color=ffffff`}
                    />
                  </div>

                  <div className="text-center md:text-left flex-grow">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {firstName} {lastName}
                    </h2>
                    {age && gender && (
                      <p className="text-gray-400 mb-2">
                        {age} • {gender}
                      </p>
                    )}
                    <p className="text-gray-300 italic text-sm line-clamp-2">
                      "{about || 'No description available'}"
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 mt-4 md:mt-0">
                  <button
                    className="btn btn-outline btn-error btn-sm"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;