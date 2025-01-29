import React, { useContext } from "react";
import Search from "../modules/Search";
import Knowledge from "../modules/Knowledge";
import "./HomePage.css";
import { UserContext } from "../App";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

const Home = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-primary font-serif relative">
      {userId ? (
          <button className="fixed top-0 right-0 m-4 bg-tertiary text-black hover:bg-tertiary hover:text-black text-white py-2 px-4 rounded z-10"
            onClick={() => {
              googleLogout();
              handleLogout();
            }}
          >
            Logout
          </button>
      ) : (
        <div/>
      )}
      <div className="w-full md:w-1/2">
        <Search />
      </div>
      <div className="bg-gray-400 h-0.5 w-full md:h-screen md:w-0.5"></div>
      <div className="w-full md:w-1/2">
        <Knowledge />
      </div>
    </div>
  );
};

export default Home;