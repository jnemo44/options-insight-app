import AdjustTradeItem from './AdjustTradeItem';


function AdjustTradeList(props) {
    // Get rid of anything BUT adjusted trade info
    const adjustedTradesOnly = []
    for (const key in props.trades) {
        if(!Number.isNaN(parseInt(key))) {
            adjustedTradesOnly.push(props.trades[parseInt(key)])
        }
    }
    return (
        <div>
        <h1>Adjustment History: {adjustedTradesOnly.length} made</h1>
        <ul className="divide-y divide-gray-200">
        {Object.values(adjustedTradesOnly).map((trade) => (
            <AdjustTradeItem 
                key={trade.id}    
                id={trade.id}
                openPrice={trade.openPrice}
                closePrice={trade.closePrice}
                openDate={trade.openDate}
                closeDate={trade.closeDate} />
            ))}
        </ul>
        </div>
    )
}

export default AdjustTradeList;