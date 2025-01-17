import React from "react";
import Search from "../modules/Search";
import Knowledge from "../modules/Knowledge";
import "./HomePage.css";

const Home = () => {
  return (
    <div className="flex h-screen bg-primary">
      <div className="flex-1">
        <Search />
      </div>
      <div className="bg-gray-500 h-full"></div>
      <div className="flex-1">
        <Knowledge />
      </div>
    </div>
  );
};

export default Home;