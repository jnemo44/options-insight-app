import { useRef, useState } from 'react';
import FormInput from '../UI/Input';
import Button from '../UI/Buttons';
import TextArea from "../UI/TextArea";


function CloseTradeForm(props) {
  // Create reference objects for the form
  const closePriceInputRef = useRef();
  const notesInputRef = useRef();
  const closeDateInputRef = useRef();
  const [PLResult, setPLResult] = useState(0);
  const positivePL = "grid col-span-1 sm:col-span-2 justify-items-center text-2xl text-green-600";
  const negativePL = "grid col-span-1 sm:col-span-2 justify-items-center text-2xl text-red-600";

  let contractsClosed = parseInt(props.tradeInfo.numContracts);
  const openPrice = parseFloat(props.tradeInfo.openPrice.replace(/\$/g,''))

  // Buy or Sell
  if (props.tradeInfo.buyOrSell === "true") {
    contractsClosed = props.tradeInfo.numContracts * -1
  }

  // Convert Date
  var myDate = new Date(props.tradeInfo.expirationDate)
  var str = myDate.toDateString()

  function closePriceHandler(event) {
    // Buy or Sell (false is buy)
    if (props.tradeInfo.buyOrSell == "false") {
      //Dynamically calculate PL Result
      setPLResult(Math.round((event.target.value - openPrice) * 100) / 100)
    }
    else {
      //Dynamically calculate PL Results
      setPLResult(Math.round((openPrice - event.target.value) * 100) / 100)
    }
  }

  function submitFormHandler(event) {
    // Stop the page from reloading automatically
    event.preventDefault();

    // Get form values after submission
    const enteredClosePrice = closePriceInputRef.current.value;
    const enteredNotes = notesInputRef.current.value;
    const enteredCloseDate = closeDateInputRef.current.value;
    // This flag is used to prevent it from showing up on the open trades page
    const closedTrade = true;

    const closeTradeData = {
      openID: props.tradeInfo.id,
      numContracts: contractsClosed,
      closePrice: enteredClosePrice,
      closeDate: enteredCloseDate,
      buyOrSell: props.tradeInfo.buyOrSell,
      adjustment: false,
      adjustmentID: props.tradeInfo.adjustmentID,
      closeNotes: enteredNotes,
      closeTrade: closedTrade,
    };

    // Send data
    //console.log(closeTradeData);
    props.onCloseTrade(closeTradeData);
  }

  return (
    <form id="close-trade" onSubmit={submitFormHandler}>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FormInput
            type="date"
            label="Close Date"
            ref={closeDateInputRef} />
        </div>
        <div>
          <FormInput
            type="text"
            label="Expiration Date"
            readOnly={true}
            value={str} />
        </div>
        <div>
          <FormInput
            type="text"
            label="Ticker"
            readOnly={true}
            value={props.tradeInfo.ticker} />
        </div>
        <div>
          <FormInput
            type="number"
            label="Number of Contracts"
            value={contractsClosed}
            readOnly={true} />
        </div>
        <div>
          <FormInput
            type="number"
            label="Open Price"
            value={openPrice}
            readOnly={true} />
        </div>
        <div>
          <FormInput
            type="number"
            step="0.01"
            label="Close Price"
            ref={closePriceInputRef}
            onChange={closePriceHandler}
          />
        </div>
        <div class={PLResult > 0 ? positivePL : negativePL}>
          {props.tradeInfo.buyOrSell == "false" ? <p>Sell to Close</p> : <p>Buy to Close</p>}
          P/L = {PLResult} x {Math.abs(contractsClosed)} x 100 = ${(PLResult * 100 * Math.abs(contractsClosed)).toFixed(2)}
        </div>
        <div className="grid col-span-1 sm:col-span-2">
          <TextArea
            label="Notes"
            prompt="How did this trade go?"
            rows="3"
            ref={notesInputRef}
          ></TextArea>
        </div>
        <div className="btn-resize sm:col-span-2">
          <div>
            <Button
              type="submit"
              name="Submit"
              className="btn-action">
            </Button>
          </div>
          <div>
            <Button
              type="button"
              onClick={props.onCancel}
              name="Cancel"
              className="btn-cancel">
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CloseTradeForm;
