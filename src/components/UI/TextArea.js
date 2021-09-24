import React from "react";

const TextArea = React.forwardRef((props, ref) => {
  return (
    <div>
      <label htmlFor={props.name} className="block text-sm font-medium text-gray-700">
          {props.label}
        </label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <textarea
          id={props.label}
          name={props.label}
          ref={ref}
          rows={props.rows}
          className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          placeholder={props.prompt}
        />
      </div>
    </div>
  );
});

export default TextArea;
