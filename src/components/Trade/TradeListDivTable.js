function tradeSelectedHandler(trade, event) {
    console.log(trade)
}


function TradeListTable(props) {
    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <div className="table min-w-full divide-y divide-gray-200">
                            <div className="table-header-group">
                                <div className="table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticker</div>
                                <div className="table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Open Date</div>
                                <div className="table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spread</div>
                                <div className="table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DTE</div>
                                <div className="table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contracts</div>
                                <div className="table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Open Price</div>
                            </div>
                            <div class="table-row-group">
                                {props.trades.map((trade, tradeIdx) => (
                                    <div id={trade.id} className="table-row hover:bg-gray-100" onClick={(e) => props.onRowSelect(trade, e)}>
                                        <div className="table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{trade.ticker}</div>
                                        <div className="table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trade.openDate}</div>
                                        <div className="table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trade.spread}</div>
                                        <div className="table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trade.dte}</div>
                                        <div className="table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trade.numContracts}</div>
                                        <div className="table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">{trade.openPrice}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default TradeListTable;