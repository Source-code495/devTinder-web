import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constansts";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { motion, useMotionValue, useTransform } from "framer-motion";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  // Set up motion values for swipe effects
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDragEnd = () => {
    if (x.get() > 100) {
      handleSendRequest("interested", _id);
    } else if (x.get() < -100) {
      handleSendRequest("ignored", _id);
    }
  };

  return (
    <motion.div
      className="card bg-base-300 w-96 shadow-xl cursor-pointer" // Added cursor-pointer
      style={{
        x,
        rotate,
        opacity,
        touchAction: "none",
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
    >
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
      </div>
    </motion.div>
  );
};

export default UserCard;
