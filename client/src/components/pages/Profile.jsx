import React, { useState } from "react";
import cloverImg from "../../assets/clover.png";
import Interest from "../modules/interest";
import NewSearchInput from "../modules/NewSearchInput";
import { Link } from "react-router-dom";

const Profile = () => {
    return (
        <div className="bg-primary flex flex-col font-serif text-white">
            <div className="mt-24 mb-8 w-full flex flex-col items-center justify-end">
            <Link to="/">
            <img
            src={cloverImg}
            alt="Lucky Clover"
            className="w-32 h-32 object-contain rounded-full mb-4"
            />
            </Link>
            <h1 className="text-4xl mb-4">Lucky Deignan (test)</h1>
            <div className="flex flex-col items-center w-1/4">
                <NewSearchInput defaultText="Add a new interest here"/>
            </div>
            <hr className="w-3/4 mt-4"></hr>
            </div>
            <div className="flex flex-row items-center justify-center">
            <div className="flex flex-row items-start w-3/4">
                <div className="pt-8 flex flex-col w-1/2 items-center">
                    <div className="mb-4">Here are your current interests:</div>
                    <div className="flex flex-row flex-wrap gap-8">
                    <Interest topic="Psychology" />
                    <Interest topic="Behavioral Economics" />
                    </div>
                </div>
                <hr className="w-px border-none h-80 bg-gray-300"></hr>
                <div className="pt-8 flex flex-col w-1/2 items-center">
                    <div className="mb-4">Recommended Interest Additions:</div>
                    <div className="flex flex-row flex-wrap gap-8 items-center justify-center">
                    <Interest topic="Physics" />
                    <Interest topic="Computational Neuroscience" />
                    <Interest topic="Yo mama" />
                    </div>
                </div>
            </div>
            </div>
            
        </div>
    );
};

export default Profile;