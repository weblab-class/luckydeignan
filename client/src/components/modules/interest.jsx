import react, { useState } from "react";
import { useParams } from "react-router-dom";

/**
 * Interest is a component for displaying what interest inspired the Fun Fact
 *
 * Proptypes
 * @param {string} topic of the interest
 * @param {string} theorems of the interest
 */

const RandomInterest = (props) => {

    return (
        <button className="bg-secondary hover:bg-tertiary hover:text-black text-white py-2 px-4 rounded mt-4">
            {props.topic}
        </button>
    )
}

export default RandomInterest