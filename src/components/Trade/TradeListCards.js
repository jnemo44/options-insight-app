// This component will display a list of all trades
// It will need to fetch data from the backend
// Find a List compopnent from Tailwind
//import React, { useState } from 'react';

import Trade from "./Trade";

//import Button from '../UI/Button';
import { AdjustmentsIcon, XIcon } from '@heroicons/react/solid'



function TradeList (props) {

        return (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {props.trades.map((trade) => (
              <li key={trade.id} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                <div className="w-full flex items-center justify-between p-6 space-x-6">
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-gray-900 text-sm font-medium truncate">{trade.ticker}</h3>
                      <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                      {trade.openPrice}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-500 text-sm truncate">{trade.numContracts}</p>
                  </div>
                  <p className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0">{trade.openPrice}</p>
                </div>
                <div>
                  <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="w-0 flex-1 flex">
                      <a
                        href={`mailto:${trade.id}`}
                        className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                      >
                        <XIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                        <span className="ml-3">Close</span>
                      </a>
                    </div>
                    <div className="-ml-px w-0 flex-1 flex">
                      <a
                        href={`tel:${trade.id}`}
                        className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                      >
                        <AdjustmentsIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                        <span className="ml-3">Adjust</span>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )
            //<Trade
            //  key={trade.id}
            //  ticker={trade.ticker}
            //  numContracts={trade.numContracts}
            //  openPrice={trade.openPrice}>
            //</Trade>

}

export default TradeList;
