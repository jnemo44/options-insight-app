import { convertDate } from '../UI/Utils';



function TradeHistory(props) {
    return (
        // <ul role="list" className="divide-y divide-gray-200">
        //     {props.tradeHistory.map((trade) => (
        //         <li key={trade.id} className="flex px-3 py-2 sm:px-0">
        //             <div className="flex-1">
        //                 <p className="mt-1 text-sm text-gray-900">{convertDate(trade.openDate).toDateString()}</p>
        //             </div>
        //             <div className="flex-1">
        //                 {trade.numContracts}
        //             </div>
        //             <div className="flex items-end">
        //                 {trade.openPrice}
        //             </div>
        //         </li>
        //     ))}
        // </ul>
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"></div>
                    <div className="table min-w-full divide-y divide-gray-200">
                        {/* <div class="table-header-group">
                            <div className="table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Strike</div>
                            <div className="table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Open Date</div>
                            <div className="table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Call/Put</div>
                            <div className="table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contracts</div>
                            <div className="table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Open Price</div>
                        </div> */}
                        <div class="table-row-group">
                            {props.tradeHistory.map((trade, tradeIdx) => (
                                <div id={trade.id} className="table-row">
                                    <div className="table-cell px-6 py-3 whitespace-nowrap text-sm">{trade.strike}</div>
                                    <div className="table-cell px-6 py-3 whitespace-nowrap text-sm">{convertDate(trade.openDate).toDateString()}</div>
                                    <div className="table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500">{trade.spread}</div>
                                    <div className="table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500">{trade.numContracts}</div>
                                    <div className="table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500">{trade.openPrice}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TradeHistory;