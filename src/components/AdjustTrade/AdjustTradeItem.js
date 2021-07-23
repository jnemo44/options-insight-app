import Emoji from '../UI/Emoji';

function AdjustTradeItem (props) {
    let openDate = new Date(props.openDate);
    let closeDate = new Date(props.closeDate);
    var od = openDate.toDateString(openDate);
    var cd = closeDate.toDateString(closeDate);
    return (
        <li key={props.id} className="px-4 py-4 sm:px-0">
            <div><Emoji symbol='📅'/> Opened on { od}</div> 
            <div><Emoji symbol='📅'/> Closed on { cd}</div> 
            <div><Emoji symbol='💰'/> Closing Price:  {props.closePrice}</div>
        </li>
    )
}

export default AdjustTradeItem;