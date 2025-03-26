import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import  { BASE_URL } from "../utils/constansts";
const Body = () => {
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user);
    const fetchUser = async () => {
      if(userData)return;// agr userData hoga toh faltu kyu hi api call krna h !!!
        try {
            const res = await axios.get(BASE_URL + "/profile/view", {
                withCredentials: true,
            });
            dispatch(addUser(res.data));
        }catch(err){ 
            if(err.status === 401) 
          { navigate("/login");}
            else{
            console.error(err);
        }
    }
    };
    useEffect(() => {
        fetchUser(); 
    }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Body;
