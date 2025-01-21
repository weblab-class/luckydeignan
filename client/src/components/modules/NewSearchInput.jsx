import React, { useState } from "react";
import "./NewSearchInput.css";

/**
 * New Search Input is a component for searching
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text of the search input
 */

// TODO: change this fucntion so that it takes in the function it performs as a param, that way we can use in profile and home page

const NewSearchInput = (props) => {
    const [searchValue, setSearchValue] = useState("");
    
    const performSearch = () => {
        if (searchValue.trim() !== "") {
            const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchValue)}`;
            window.open(googleUrl, '_self');
            setSearchValue(""); // Clear the input after search
        }
    };

    const handleSubmit = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            performSearch();
        }
    };

    const handleButtonClick = (event) => {
        event.preventDefault();
        performSearch();
    };

    return (
        <div className="u-flex">
            <div className="input-container">
                <button
                    className="material-symbols-outlined"
                    onClick={handleButtonClick}
                >
                    search
                </button>
                <input
                    type="text"
                    placeholder={"Search Google or type a URL"}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleSubmit}
                    className="NewSearchInput-input"
                />
            </div>
        </div>
    );
};

export default NewSearchInput;