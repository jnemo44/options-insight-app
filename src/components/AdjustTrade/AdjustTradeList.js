import AdjustTradeItem from './AdjustTradeItem';


function AdjustTradeList(props) {
    return (
        <ul>
        {Object.values(props.trades).map((trade) => (
            <AdjustTradeItem 
                key={trade.id}    
                id={trade.id}
                openPrice={trade.openPrice}
                closePrice={trade.closePrice}
                openDate={trade.openDate}
                closeDate={trade.closeDate} />
            ))}
        </ul>
    )
}

export default AdjustTradeList;