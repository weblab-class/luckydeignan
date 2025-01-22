import React, { useState, useEffect, useContext } from "react";
import { get, post } from "../../utilities";
import Interest from "./interest";
import "./Knowledge.css";
import "../../utilities.css";
import { UserContext } from "../App";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

const Knowledge = () => {
  const [knowledge, setKnowledge] = useState("");
  const [interest, setInterest] = useState("");
  const [currentTheorem, setCurrentTheorem] = useState("");
  const { userId, handleLogin, handleLogout } = useContext(UserContext);


  useEffect(() => {
    post("/api/aiTheorem").then((response) => {
      setInterest(response.topic);
      setCurrentTheorem(response.text);
      get("/api/aiDescription", { theorem: response.text }).then((description) => {
        setKnowledge(`${description.text}`);
      }).catch((error) => {
        console.log(error);
        setKnowledge("Oops! Something went wrong. Try again in a minute.");
      });
    });
  }, []);

  const handleLearnMore = () => {
    const searchQuery = `${currentTheorem} ${interest} theorem`;
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    window.open(googleUrl, '_blank'); 
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center font-serif">
      {userId ? (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <button className="absolute top-0 right-0 m-4 bg-tertiary text-black hover:bg-tertiary hover:text-black text-white py-2 px-4 rounded"
            onClick={() => {
              googleLogout();
              handleLogout();
            }}
          >
            Logout
          </button>
          <h1 className="text-2xl text-white mb-4 text-center underline">
            Today's Piece of Knowledge
          </h1>
          <p className="text-lg text-white text-center w-11/12">{knowledge}</p>
          
          <div className="flex flex-col items-center w-3/4">
            <h3 className="text-white pt-16">Based on your interest in:</h3>
            <div className="flex flex-row justify-center gap-x-4">
              <Interest topic={interest}/>
              <button 
                onClick={handleLearnMore}
                className="bg-tertiary text-black hover:bg-tertiary hover:text-black text-white py-2 px-4 rounded mt-4"
              >
                Click to Learn More
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-2xl text-white mb-4 text-center">Please sign in to use this feature!</h1>
        <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
        </div>
      )}
      
    </div>
  );
};

export default Knowledge;