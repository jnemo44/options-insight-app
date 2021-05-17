// This component will display a list of all trades
// It will need to fetch data from the backend
// Find a List compopnent from Tailwind
import React, { useState } from 'react';

//import Button from '../UI/Button';
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