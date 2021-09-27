import AdjustTradeItem from './AdjustTradeItem';


function AdjustTradeList(props) {
    // Get rid of anything BUT adjusted trade info
    const adjustedTradesOnly = []
    for (let key in props.trades) {
        let intKey = parseInt(key);
        console.log(props.trades)
        console.log(key)
        // NaN's are made by extra data/calculations (DIT, P/L, ect.) passed to trades
        // I only want to look at adjusted trades (adjustment = true)
        if(!Number.isNaN(intKey) && props.trades[intKey].adjustment) {
            adjustedTradesOnly.push(props.trades[intKey])
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