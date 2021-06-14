import { useRef } from 'react';
import FormInput from '../UI/Input';
import Button from '../UI/Button';
import TextArea from "../UI/TextArea";


function CloseTradeForm(props) {
  // Create reference objects for the form
  const closePriceInputRef = useRef();
  const notesInputRef = useRef();

  var contractsClosed = props.tradeInfo.numContracts;

  //Buy or Sell
  if(props.tradeInfo.buyOrSell === "true") {
    contractsClosed = props.tradeInfo.numContracts * -1
  }

  function submitFormHandler(event) {
    // Stop the page from reloading automatically
    event.preventDefault();

    // Get form values after submission
    const enteredClosePrice = closePriceInputRef.current.value;
    const enteredNotes = notesInputRef.current.value;
    const closedTrade = true;

    const closeTradeData = {
      openID: props.tradeInfo.id,
      ticker: props.tradeInfo.ticker,
      numContracts: contractsClosed,
      closePrice: enteredClosePrice,
      openDate: props.tradeInfo.openDate,
      expirationDate: props.tradeInfo.expirationDate,
      buyOrSell: props.tradeInfo.buyOrSell,
      adjustment: false,
      closeNotes: enteredNotes,
      closedTrade: closedTrade,
    };

    // Send data
    console.log(closeTradeData);
    //props.onAddTrade(newTradeData);
  }

  return (
    <form id="new-trade" onSubmit={submitFormHandler} class="space-y-4">
      <div class="grid grid-rows-4 grid-cols-2 gap-4">
        <div>
          <FormInput
            type="text"
            label="Open Date"
            readonly={true}
            value={props.tradeInfo.openDate}
          />
        </div>
        <div class="col-start-2">
          <FormInput
            type="text"
            label="Expiration Date"
            value={props.tradeInfo.expirationDate}
          />
        </div>
        <div>
          <FormInput
            type="text"
            label="Ticker"
            value={props.tradeInfo.ticker}
          />
        </div>
        <div class="col-start-2">
          <FormInput
            type="number"
            min="1"
            value={contractsClosed}
            label="Number of Contracts"
          />
        </div>
        <div>
          <FormInput
            type="number"
            step="0.01"
            label="Open Price"
            value={props.tradeInfo.openPrice}
          />
        </div>
        <div>
          <FormInput
            type="number"
            step="0.01"
            label="Close Price"
            readonly = {true}
            ref={closePriceInputRef}
          />
        </div>
      </div>

      <div>
        <TextArea
          label="Notes"
          prompt="How did this trade go?"
          rows="3"
          ref={notesInputRef}
        ></TextArea>
      </div>
      <div class="flex justify-center space-x-20">
        <div>
          <Button
            type="submit"
            name="Submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          ></Button>
        </div>
        <div>
          <Button
            type="button"
            onClick={props.onCancel}
            name="Cancel"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          ></Button>
        </div>
      </div>
    </form>
  );
}

export default CloseTradeForm;
