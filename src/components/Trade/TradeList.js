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




/*

const TradeList = () => {
  const [openOrders, setOpenOrders] = useState([]);

  function fetchOpenTradesHandler() {
    fetch('https://tether-89676-default-rtdb.firebaseio.com/.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const transformedOrders = data.results.map(openOrdersData => {
        return{
          ticker: openOrdersData.ticker,
          numContracts: openOrdersData.number_contracts,
          openPrice: openOrdersData.open_price
        }
      })
      setOpenOrders(transformedOrders);
      console.log(transformedOrders);
    })
  }
 return (
    <div className="flex flex-col">
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <Button
        clicked={fetchOpenTradesHandler}>
      </Button>
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticker
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  # of Contracts
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Open Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  P/L
                </th>
                <th scope="col" className="absolute px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
                <th scope="col" className="absolute px-6 py-3">
                  <span className="sr-only">Adjust</span>
                </th>
                <th scope="col" className="absolute px-6 py-3">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              
              <tr className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  XYZ
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  -1
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2.00
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  This is a test
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  +50%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="www.google.com" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                </td>
              </tr>
  
              
              <tr className="bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  AAPL
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  -3
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  2.99
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Test number 2
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  +50%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="www.google.com" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="www.google.com" className="text-indigo-600 hover:text-indigo-900">Adjust</a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="www.google.com" className="text-red-600 hover:text-red-900">Delete</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

 );

};

export default TradeList;
*/