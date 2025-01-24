import React, { useState } from "react";
import "./NewSearchInput.css";

/**
 * New Search Input is a component for searching
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text of the search input
 * @param {func} handleEnter: function that performs the desired search functionality
 */

// TODO: change this fucntion so that it takes in the function it performs as a param, that way we can use in profile and home page

const NewSearchInput = (props) => {
    const [searchValue, setSearchValue] = useState("");

    const handleSubmit = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            props.handleEnter(searchValue);
            setSearchValue("");
        }
    };

    const handleButtonClick = (event) => {
        event.preventDefault();
        props.handleEnter(searchValue);
        setSearchValue("");
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
                    placeholder={props.defaultText}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleSubmit}
                    autoFocus
                    className="NewSearchInput-input"
                />
            </div>
        </div>
    );
};

export default NewSearchInput;