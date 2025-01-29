import React, { useState, useEffect, useContext } from "react";
import cloverImg from "../../../dist/clover.png";
import NewSearchInput from "../modules/NewSearchInput";
import { Link } from "react-router-dom";
import { post } from "../../utilities";
import { UserContext } from "../App";
import { get } from "../../utilities";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import DisplayInterests from "../modules/displayInterests";


const Profile = () => {
    const { userId, userName, handleLogin, handleLogout } = useContext(UserContext);
    const [interests, setInterests] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (userId) {
            get("/api/interests").then((interests) => {
                setInterests(interests);
            });
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            get("/api/suggestions").then((suggestions) => {
                setSuggestions(suggestions);
            });
        }
    }, [interests]);

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("");
            }, 2000); // Hide after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    const addNewInterest = (interest) => {
        const body = { topic: interest };
        get("/api/validInterest?topic=" + interest).then((response) => {
            if (response.valid === false) {
                return Promise.reject("Invalid interest");
            }
        }).then(() => {
            post("/api/newInterest", body).then((updatedInterests) => {
              setInterests(updatedInterests);
            });
        })
        .catch((error) => {
            console.log(error)
            if (error === "Invalid interest") {
                setErrorMessage("Sorry, that topic isn't suitable for generating theorems or fun facts.");
            }
        });
      };


      const deleteInterest = (interest) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this interest? \n If unsuccessful, refresh the page and try again.");
        if (confirmDelete) {
          const body = { topic: interest };
          post("/api/deleteInterest", body).then((updatedInterests) => {
            setInterests(updatedInterests);
          });
        }
      }

    return (
        <div className="min-h-screen bg-primary flex flex-col font-serif text-white">
            {errorMessage && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow-lg">
                    {errorMessage}
                </div>
            )}
            {userId ? (
                <>
                <button className="absolute top-0 right-0 m-4 bg-tertiary text-black hover:bg-tertiary hover:text-black text-white py-2 px-4 rounded"
                onClick={() => {
                  googleLogout();
                  handleLogout();
                }}
              >
                Logout
              </button>
              <div className="mt-24 mb-8 w-full flex flex-col items-center justify-center">
                <Link to="/">
                    <img
                        src={cloverImg}
                        alt="Profile Picture"
                        className="w-32 h-32 object-contain rounded-full mb-4"
                    />
                </Link>
                <h1 className="text-4xl mb-4">{userName}</h1>
                <div className="flex flex-col items-center justify-center w-1/4">
                    <NewSearchInput defaultText="Add a new interest here" handleEnter={addNewInterest}/>
                </div>
                <hr className="w-3/4 mt-4"></hr>
            </div>
            <div className="flex flex-row justify-center">
                <div className="flex flex-row items-start w-3/4">
                    <DisplayInterests title="Here are your current interests (click to remove):" arr={interests} click={deleteInterest}/>
                    <hr className="w-px border-none h-80 bg-gray-300"></hr>
                    <DisplayInterests title="Here are some suggested interests (click to add):" arr={suggestions} click={addNewInterest}/>
                </div>
            </div>
                </>
            ) : (
                <div className="bg-primary w-full min-h-screen flex flex-col items-center justify-center">
                    <h1 className="text-4xl mb-4">Login to view your profile</h1>
                    <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
                </div>
            )}
        </div>
    );
};

export default Profile;