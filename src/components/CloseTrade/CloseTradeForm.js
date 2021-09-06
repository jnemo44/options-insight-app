import { useRef, useState } from 'react';
import FormInput from '../UI/Input';
import Button from '../UI/Button';
import TextArea from "../UI/TextArea";


function CloseTradeForm(props) {
  // Create reference objects for the form
  const closePriceInputRef = useRef();
  const notesInputRef = useRef();
  const closeDateInputRef = useRef();
  const [enteredClosePrice, setEnteredClosePrice] = useState(0);

  var contractsClosed = props.tradeInfo.numContracts;

  // Buy or Sell
  if(props.tradeInfo.buyOrSell === "true") {
    contractsClosed = props.tradeInfo.numContracts * -1
  }

  // Convert Date
  console.log(props.tradeInfo.expirationDate)
  var myDate = new Date(props.tradeInfo.expirationDate)
  console.log(myDate)
  var str = myDate.toDateString()
  console.log(str)

  function closePriceHandler (event) {
    setEnteredClosePrice(event.target.value)
    console.log('Close Price Keystroke')
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
            ref={closeDateInputRef}
          />
        </div>
        <div>
          <FormInput
            type="text"
            label="Expiration Date"
            readOnly = {true}
            value={str}
          />
        </div>
        <div>
          <FormInput
            type="text"
            label="Ticker"
            readOnly = {true}
            value={props.tradeInfo.ticker}
          />
        </div>
        <div>
          <FormInput
            type="number"
            min="1"
            value={contractsClosed}
            readOnly = {true}
            label="Number of Contracts"
          />
        </div>
        <div>
          <FormInput
            type="number"
            step="0.01"
            readOnly = {true}
            label="Open Price"
            value={props.tradeInfo.openPrice}
          />
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
        <div class="grid col-span-1 md:col-span-2 justify-items-center text-2xl">
            {Math.round((props.tradeInfo.openPrice - enteredClosePrice) * 100) / 100}
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
      <div class="px-4 py-3 sm:px-3 sm:flex sm:flex-row-reverse">
        <Button
            type="button"
            onClick={props.onCancel}
            name="Cancel"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
        ></Button>
        <Button
          //class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
          //"grid grid-cols-1 md:grid-cols-2 justify-items-end gap-4"
          type="submit"
          name="Submit"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-black hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-0 sm:w-auto sm:text-sm"
        ></Button>
      </div>   
    </form>
  );
}

export default CloseTradeForm;
