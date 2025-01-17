import React, { useState, useEffect } from "react";
import "./Knowledge.css";
import "../../utilities.css";


const Knowledge = () => {
  const [knowledge, setKnowledge] = useState("");


  useEffect(() => {
    setKnowledge("The “get it free for a limited time” approach from corporations plays on the consumer behavior tendency loss aversion, aiming to make users feel they’ll miss out if they don’t act.")

}, []);
  

  return (
    <div className="h-screen flex flex-col items-center justify-center font-serif">
      <h1 className="text-2xl text-white mb-4 text-center underline">
        Today's Piece of Knowledge
      </h1>
      <p className="text-lg text-white text-center">{knowledge}</p>
      <button className="bg-secondary hover:bg-tertiary hover:text-black text-white py-2 px-4 rounded mt-4">
        Learn More
      </button>
      <div className="flex flex-col items-center w-3/4">
        <h3 className="text-white pt-16">Based on your interests in:</h3>
        <div className="flex flex-row justify-evenly w-full">
        <button className="bg-secondary hover:bg-tertiary hover:text-black text-white py-2 px-4 rounded mt-4">
          Behavioral Economics
        </button>
        <button className="bg-secondary hover:bg-tertiary hover:text-black text-white py-2 px-4 rounded mt-4">
          Psychology
        </button>
        </div>
        </div>
    </div>
  );
};

export default Knowledge;