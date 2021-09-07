import { useRef, useState } from 'react';
import FormInput from '../UI/Input';
import Button from '../UI/Button';
import TextArea from "../UI/TextArea";


function CloseTradeForm(props) {
  // Create reference objects for the form
  const closePriceInputRef = useRef();
  const notesInputRef = useRef();
  const closeDateInputRef = useRef();
  const [PLResult, setPLResult] = useState(0);
  const positivePL = "grid col-span-1 md:col-span-2 justify-items-center text-2xl text-green-600";
  const negativePL = "grid col-span-1 md:col-span-2 justify-items-center text-2xl text-red-600";

  var contractsClosed = props.tradeInfo.numContracts;

  // Buy or Sell
  if (props.tradeInfo.buyOrSell === "true") {
    contractsClosed = props.tradeInfo.numContracts * -1
  }

  // Convert Date
  var myDate = new Date(props.tradeInfo.expirationDate)
  var str = myDate.toDateString()

  function closePriceHandler(event) {
    //Dynamically calculate PL Result
    setPLResult(Math.round((props.tradeInfo.openPrice - event.target.value) * 100) / 100)
  }

  function submitFormHandler(event) {
    // Stop the page from reloading automatically
    event.preventDefault();

    // Get form values after submission
    const enteredClosePrice = closePriceInputRef.current.value;
    const enteredNotes = notesInputRef.current.value;
    const enteredCloseDate = closeDateInputRef.current.value;
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
    //"grid grid-rows-4 grid-cols-2 gap-2"
    //class=grid gap-2
  }

  return (
    <form id="close-trade" onSubmit={submitFormHandler}>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            value={props.tradeInfo.openPrice}
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
          P/L = {PLResult} x {Math.abs(props.tradeInfo.numContracts)} x 100 = ${PLResult * 100 * Math.abs(props.tradeInfo.numContracts)}
        </div>
        <div class="grid col-span-1 md:col-span-2">
          <TextArea
            label="Notes"
            prompt="How did this trade go?"
            rows="3"
            ref={notesInputRef}
          ></TextArea>
        </div>
      </div>
      <div class="sm:flex sm:justify-end">
        <Button
          type="submit"
          name="Submit"
          className="mt-4 mr-4 w-full inline-flex justify-center rounded-md border border-transparent 
          shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-0 
          sm:w-auto sm:text-sm">
        </Button>
        <Button
          type="button"
          onClick={props.onCancel}
          name="Cancel"
          className="mt-4 w-full inline-flex justify-center rounded-md border border-gray-300 
            shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 
            sm:w-auto sm:text-sm">
        </Button>
      </div>
    </form>
  );
}

export default CloseTradeForm;
