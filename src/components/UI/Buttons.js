import React from "react";
import { classNames } from "./Utils";

// Normal Square Button "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

const Button = (props) => {
  return (
      <button
          type={props.type}
          className={props.className}
          onClick={props.onClick}
      >
        {props.name}
        {props.children}
      </button>
  )

}

// Buttons for pagination
export function PageButton({ children, className, ...rest }) {
  return (
    <button
      type="button"
      className={classNames(
        "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;