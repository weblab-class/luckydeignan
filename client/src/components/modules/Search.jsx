import React from "react";
import "./Search.css";
import NewSearchInput from "./NewSearchInput";

const Search = () => {
  return (
    <div className="flex flex-col justify-center items-center text-white font-serif h-screen">
      <div className="flex flex-col items-center justify-end">
        <h1 className="text-6xl mb-2">Loogle</h1>
        <h3 className="text-xl text-gray-300">(like google but way way better)</h3>
      </div>
      <div className="w-3/4 mt-4 mb-16">
        <NewSearchInput />
      </div>
        <div className="flex flex-row items-center w-11/12 gap-1">
          <hr className="flex-grow h-px bg-secondary border-0" />
          <div className="text-white">or</div>
          <hr className="flex-grow h-px bg-secondary border-0" />
        </div>
        <h4 className="items-center justify-center underline mt-8">Add a New Interest to Your Profile</h4>
    </div>
  );
};

export default Search;