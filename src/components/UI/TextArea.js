import React from "react";

const TextArea = React.forwardRef((props, ref) => {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
      <label
        htmlFor={props.label}
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        {props.label}
      </label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <textarea
          id={props.label}
          name={props.label}
          ref={ref}
          rows={props.rows}
          className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          defaultValue={""}
        />
        <p className="mt-2 text-sm text-gray-500">{props.prompt}</p>
      </div>
    </div>
  );
});

export default TextArea;
