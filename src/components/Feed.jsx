import axios from "axios";
import { BASE_URL } from "../utils/constansts";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return null;

  return (
    <div className="flex items-center justify-center h-screen w-full bg-[#0b1120]">
      <div className="bg-[#111827] p-8 rounded-xl shadow-lg">
        {feed.length > 0 ? (
          <UserCard user={feed[0]} />
        ) : (
          <h1 className="text-xl font-semibold text-gray-400">
            No new users found!
          </h1>
        )}
      </div>
    </div>
  );
};

export default Feed;
