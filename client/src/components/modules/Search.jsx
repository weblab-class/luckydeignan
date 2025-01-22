import React, { useContext } from "react";
import "./Search.css";
import NewSearchInput from "./NewSearchInput";
import { UserContext } from "../App";

const Search = () => {
  const { userId } = useContext(UserContext);

  const performSearch = (value) => {
    if (value.trim() !== "") {
      const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(value)}`;
      window.open(googleUrl, "_self");
    }
  };


  return (
    <div className="flex flex-col justify-center items-center text-white font-serif h-screen">
      <div className="flex flex-col items-center justify-end">
        <h1 className="text-6xl mb-2">Loogle</h1>
        <h3 className="text-xl text-gray-300">(like google but way way better)</h3>
      </div>
      <div className="w-3/4 mt-4 mb-16">
        <NewSearchInput defaultText="Search Google or type a URL" handleEnter={performSearch}/>
      </div>
      <div className="flex flex-row items-center w-11/12 gap-1">
        <hr className="flex-grow h-px bg-secondary border-0" />
        <div className="text-white">or</div>
        <hr className="flex-grow h-px bg-secondary border-0" />
      </div>
      {userId ? (
        <div>
          <h4 className="items-center justify-center underline mt-8 text-base font-bold">
            <a href="/profile">Add a New Interest to Your Profile</a>
          </h4>
        </div>
      ) : (
        <div>
          <h4 className="items-center justify-center font-bold mt-8">
            Sign in to Add a New Interest to Your Profile
          </h4>
        </div>
      )}
    </div>
  );
};

export default Search;
