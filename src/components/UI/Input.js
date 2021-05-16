import React from 'react';

const input = React.forwardRef ((props, ref) => {
    return (
        <div>
        <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">
          {props.label}
        </label>
        <div className="mt-1">
        <input
            type={props.type}
            id={props.name}
            required
            ref={ref}
            //name={props.name}    
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder={props.placeholder}
          />
        </div>
        </div>
    );
}
)

export default input;