import { convertDate, sortDate } from '../UI/Utils';



function TradeHistory(props) {
    // Sort the trade history in chronological order
    sortDate(props.tradeHistory)
    return (
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
                                    <div className="table-cell px-6 py-3 whitespace-nowrap text-sm">
                                        {trade.strike}
                                        {trade.adjustmentID === trade.openID ? 
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Open</span> : 
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">Adjustment</span>
                                        }
                                        
                                    </div>
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