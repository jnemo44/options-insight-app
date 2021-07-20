

function AdjustTradeItem (props) {
    let openDate = new Date(props.openDate);
    let closeDate = new Date(props.closeDate);
    var od = openDate.toDateString(openDate);
    var cd = openDate.toDateString(closeDate);
    return (
        <li key={props.id} className="px-4 py-4 sm:px-0">
            <div>Open Date:{od}</div> 
            <div>Close Date:{cd}</div> 
            <div>Close Price:{props.closePrice}</div>
        </li>
    )
}

export default AdjustTradeItem;