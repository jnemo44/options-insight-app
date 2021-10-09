
function TradeListTable(props) {
    return (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Ticker
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Open Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Expiration Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      DTE
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      # Contracts
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Open Price
                    </th>
                    
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {props.trades.map((trade, tradeIdx) => (
                    <tr key={trade.id} className={tradeIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>  
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{trade.ticker}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trade.openDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trade.expirationDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trade.dte}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trade.numContracts}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trade.openPrice}</td>      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  export default TradeListTable;
  