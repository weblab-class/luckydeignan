import react, { useState } from "react";
import "./NewSearchInput.css";

const NewSearchInput = () => {
    

    return (
        <div className="u-flex">
            <div className="input-container">
            <span className="material-symbols-outlined">search</span>
                <input
                    type="text"
                    placeholder={"Search Google or type a URL"}
                    className="NewSearchInput-input"
                />
                
            </div>
        </div>
    );
}

export default NewSearchInput