import react, { useState } from "react";
import { useParams } from "react-router-dom";

/**
 * Interest component for displaying a single interest
 *
 * Proptypes
 * @param {string} topic of the interest
 * @param {function} func that performs the desired functionality
 */

const Interest = ({ topic, func = () => console.log("Clicked interest button (no function provided)") }) => {

    return (
        <button className="bg-secondary hover:text-black text-sm md:text-base text-white py-2 px-4 rounded" onClick={() => func(topic)} >
            {topic}
        </button>
    )
};

export default Interest