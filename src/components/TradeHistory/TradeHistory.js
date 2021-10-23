import {convertDate} from '../UI/Utils';



function TradeHistory(props) {
    return (
        <ul role="list" className="divide-y divide-gray-200">
            {props.tradeHistory.map((trade) => (
                <li key={trade.id} className="flex px-3 py-3 sm:px-0">
                    <div className="flex-1">
                        {convertDate(trade.openDate).toDateString()}
                    </div>
                    <div className="flex-1">
                        {trade.numContracts}
                    </div>
                    <div className="flex-1">
                        {trade.openPrice}
                    </div>    
                </li>
            ))}
        </ul>
    )
}

export default TradeHistory;