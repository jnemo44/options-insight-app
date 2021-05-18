
function Trade (props) {

    return(
        <li key={props.id} className="bg-white shadow overflow-hidden px-4 py-4 sm:px-6 sm:rounded-md">
          <div>
                <h2>{props.ticker}</h2>
            </div>
            <div>
                <h2>{props.numContracts}</h2>
            </div>
            <div>
                <h2>{props.openPrice}</h2>
            </div>
        </li>

            

    )
}

export default Trade;