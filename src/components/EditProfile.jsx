import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constansts";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");
    if (!firstName.trim() || !lastName.trim() || !age || !gender) {
      setError("Please fill in all required fields.");
      return;
    }
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response?.data || "An error occurred.");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center h-screen w-full bg-[#0b1120] p-6">
        {/* Profile Edit Form */}
        <div className="card bg-[#111827] w-96 shadow-xl text-white p-6 rounded-xl">
          <div className="card-body">
            <h2 className="text-2xl font-semibold text-center">Edit Profile</h2>
            <div>
              <label className="form-control w-full my-2">
                <span className="label-text text-gray-400">First Name:</span>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered bg-gray-800 text-white w-full"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full my-2">
                <span className="label-text text-gray-400">Last Name:</span>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered bg-gray-800 text-white w-full"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <label className="form-control w-full my-2">
                <span className="label-text text-gray-400">Photo URL:</span>
                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered bg-gray-800 text-white w-full"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>
              <label className="form-control w-full my-2">
                <span className="label-text text-gray-400">Age:</span>
                <input
                  type="number"
                  value={age}
                  className="input input-bordered bg-gray-800 text-white w-full"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              <label className="form-control w-full my-2">
                <span className="label-text text-gray-400">Gender:</span>
                <select
                  value={gender}
                  className="select select-bordered bg-gray-800 text-white w-full"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label className="form-control w-full my-2">
                <span className="label-text text-gray-400">About:</span>
                <textarea
                  value={about}
                  className="textarea textarea-bordered bg-gray-800 text-white w-full"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>
            </div>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            <div className="card-actions justify-center mt-4">
              <button
                className="btn btn-primary w-full transition duration-300 hover:scale-105"
                onClick={saveProfile}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>

        {/* Live Profile Preview */}
        <div className="mt-8 md:mt-0 md:ml-10">
          <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
        </div>
      </div>

      {/* Success Toast Notification */}
      {showToast && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white py-2 px-4 rounded-lg shadow-lg animate-bounce">
          Profile saved successfully.
        </div>
      )}
    </>
  );
};

export default EditProfile;
