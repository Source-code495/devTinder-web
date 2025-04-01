import axios from "axios";
import { BASE_URL } from "../utils/constansts";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";
const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to fetch connections", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="loading loading-spinner loading-lg text-blue-500"></div>
      </div>
    );
  }

  if (!connections || connections.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center text-white">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-24 w-24 text-gray-600 mb-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" 
          />
        </svg>
        <h1 className="text-2xl font-bold text-gray-400">
          No Connections Found
        </h1>
        <p className="text-gray-500 mt-2">
          Start connecting with developers to expand your network!
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-white mb-10 tracking-wider">
          My Connections
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((connection) => {
            const { 
              _id, 
              firstName, 
              lastName, 
              photoUrl, 
              age, 
              gender, 
              about 
            } = connection;

            return (
              <div 
                key={_id}
                className="bg-gray-800 rounded-2xl shadow-2xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-700"
              >
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 mb-4">
                    <img
                      alt={`${firstName} ${lastName}`}
                      className="w-full h-full rounded-full object-cover ring-4 ring-blue-600"
                      src={photoUrl || `https://ui-avatars.com/api/?name=${firstName}&background=1a1a2e&color=ffffff`}
                    />
                  </div>

                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {firstName} {lastName}
                    </h2>
                    {age && gender && (
                      <p className="text-gray-400 mb-2">
                        {age} • {gender}
                      </p>
                    )}
                    <p className="text-gray-300 italic text-sm line-clamp-3">
                      `{about || 'No description available'}`
                    </p>
                  </div>

                  <div className="mt-4 flex space-x-3">
                  <Link to= { `/chat/${_id}`}>
                    <button 
                      className="btn btn-sm btn-outline btn-primary"
                      onClick={() => {/* Message functionality */}}
                    >
                      Message
                    </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;