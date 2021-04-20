import React from 'react';


const input = (props) => {
    return (
        <div>
        <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">
          {props.label}
        </label>
        <div className="mt-1">
        <input
            type={props.type}
            name={props.name}
            id={props.name}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder={props.placeholder}
          />
        </div>
        </div>
    );
}

export default input;