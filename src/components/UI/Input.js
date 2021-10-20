import React from 'react';

const FormInput = React.forwardRef ((props, ref) => {
    return (
        <div>
        <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">
          {props.label}
        </label>
        <div className="mt-1">
        <input
            type={props.type}
            id={props.name}
            name={props.name}
            readOnly={props.readOnly ? true : false}
            required
            ref={ref}
            step={props.step}   
            className="shadow-sm focus:ring-green-600 focus:border-green-600 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder={props.placeholder}
            defaultValue={props.defaultValue}
            value={props.value}
            min={props.min}
            onChange={props.onChange}
          />
        </div>
        </div>
    );
}
)

export default FormInput;