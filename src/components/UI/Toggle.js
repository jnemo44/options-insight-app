/* This example requires Tailwind CSS v2.0+ */
import { useState } from "react";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function BuySellToggle(props) {
  return (
    <Switch.Group as="div" className="flex flex-col">
      <Switch
        checked={props.enabled}
        onChange={props.setEnabled}
        className={classNames(
          props.enabled ? "bg-red-600" : "bg-green-600",
          //'relative inline-flex flex-shrink-0 h-7 w-13 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grey-500'
          "relative inline-flex h-7 w-20 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grey-500"
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          className={classNames(
            props.enabled ? "translate-x-9" : "translate-x-0",
            "pointer-events-none relative inline-block h-6 w-10 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
          )}
        >
          <span
            className={classNames(
              props.enabled
                ? "opacity-0 ease-out duration-100"
                : "opacity-100 ease-in duration-200",
              "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
            )}
            aria-hidden="true"
          >
            <p>BUY</p>
          </span>
          <span
            className={classNames(
              props.enabled
                ? "opacity-100 ease-in duration-200"
                : "opacity-0 ease-out duration-100",
              "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
            )}
            aria-hidden="true"
          >
            <p>SELL</p>
          </span>
        </span>
      </Switch>
      {/* <Switch.Label as="span" className="ml-3">
        <span className="text-sm font-medium text-gray-900">Buy/Sell</span>
      </Switch.Label> */}
    </Switch.Group>
  );
}

export default BuySellToggle;
