import react, { useState } from "react";
import { useParams } from "react-router-dom";

/**
 * Interest is a component for displaying what interest inspired the Fun Fact
 *
 * Proptypes
 * @param {string} topic of the interest
 * @param {string} theorems of the interest
 */

const Interest = (props) => {

    return (
        <button className="bg-secondary hover:text-black text-white py-2 px-4 rounded">
            {props.topic}
        </button>
    )
}

export default Interest