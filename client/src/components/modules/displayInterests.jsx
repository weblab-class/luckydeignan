import React, { useState } from "react";
import Interest from "./interest";


/**
 * DisplayInterests is a component for displaying different interest buttons in different contexts
 *
 * Proptypes
 * @param {string} title of the section that contains interest buttons
 * @param {array} arr an array of interests
 * @param {function} click that performs the desired  functionality when button clicked
 */

const DisplayInterests = (props) => {
    return (
    <div className="pt-8 px-4 flex flex-col w-1/2 items-center">
        <div className="mb-4 text-center">{props.title}</div>
        <div className="flex flex-row justify-center flex-wrap gap-x-6 gap-y-4">
        {props.arr.map((button) => (
            <Interest topic={button.topic} key={button._id} func={props.click}/>
        ))}
        </div>
    </div>
    )
}

export default DisplayInterests;