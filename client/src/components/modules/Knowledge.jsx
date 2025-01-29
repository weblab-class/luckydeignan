import React, { useState, useEffect, useContext } from "react";
import { get, post } from "../../utilities";
import Interest from "./interest";
import "./Knowledge.css";
import "../../utilities.css";
import { UserContext } from "../App";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

const Knowledge = () => {
  const [knowledge, setKnowledge] = useState("Loading..."); // Start with loading state
  const [interest, setInterest] = useState("");
  const [currentTheorem, setCurrentTheorem] = useState("");
  const { userId, handleLogin, handleLogout } = useContext(UserContext);

  useEffect(() => {
    if (userId) {
      post("/api/aiTheorem") // first retrieve theorem from database
        .then((response) => {
          if (response.err) {
            setKnowledge("You need to create an interest first, go to your profile (lower left) and enter one!");
            return Promise.reject("An uninterested bloke"); // throw error if no interests
          }
          setInterest(response.topic); // set interest and theorem
          setCurrentTheorem(response.text);
          return get("/api/aiDescription", { theorem: response.text, topic: response.topic }); // get description of theorem
        })
        .then((description) => {
          setKnowledge(`${description.text}`); // set theorem description
        })
        .catch((error) => {
          console.log(error);
          if (error === "An uninterested bloke") return; // Already set the error message
          setKnowledge("Oops! Something went wrong. Try again in a minute."); // hopefully just an API limit error
        });
    } else if (userId === undefined) {
      // userId is undefined means we're still loading
      setKnowledge("Loading...");
    } else {
      // userId is null means we're definitely logged out
      setKnowledge("Please log in to get started.");
    }
  }, [userId]);

  const handleLearnMore = () => {
    const searchQuery = `${currentTheorem} ${interest} theorem`;
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    window.open(googleUrl, '_blank');
  };

  return (
    <div className="h-[80vh] md:h-screen flex flex-col items-center justify-center font-serif">
      {userId ? (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <h1 className="text-2xl text-white mb-4 text-center underline">
            Today's Piece of Knowledge
          </h1>
          <p className="text-lg text-white text-center w-11/12">{knowledge}</p>
          {knowledge !== "You need to create an interest first, go to your profile (lower left) and enter one!" ? (
            <div className="flex flex-col items-center w-3/4">
              <h3 className="text-white pt-16">Based on your interest in:</h3>
              <div className="flex flex-row items-center justify-center gap-x-4">
                <Interest topic={interest} />
                <button
                  onClick={handleLearnMore}
                  className="bg-tertiary text-black hover:bg-tertiary hover:text-black text-white py-2 px-4 rounded my-4"
                >
                  Click to Learn More
                </button>
              </div>
            </div>
          ) : null}
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