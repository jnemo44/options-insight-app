import { useRef } from 'react';
import FormInput from '../UI/Input';
import Button from '../UI/Button';
import TextArea from "../UI/TextArea";


function CloseTradeForm(props) {
  // Create reference objects for the form
  const tickerInputRef = useRef();
  const numContractInputRef = useRef();
  const openPriceInputRef = useRef();
  const openDateInputRef = useRef();
  const expirationDateInputRef = useRef();
  const notesInputRef = useRef();

  function submitFormHandler(event) {
    // Stop the page from reloading automatically
    event.preventDefault();

    // Get form values after submission
    const enteredTicker = tickerInputRef.current.value;
    let enteredNumContracts = numContractInputRef.current.value;
    const enteredOpenPrice = openPriceInputRef.current.value;
    const enteredOpenDate = openDateInputRef.current.value;
    const enteredExpirationDate = expirationDateInputRef.current.value;
    const enteredNotes = notesInputRef.current.value;
    const closedTrade = false;

    const closeTradeData = {
      ticker: enteredTicker,
      numContracts: enteredNumContracts,
      openPrice: enteredOpenPrice,
      openDate: enteredOpenDate,
      expirationDate: enteredExpirationDate,
      notes: enteredNotes,
      closedTrade: closedTrade,
    };

    // Send data
    //props.onAddTrade(newTradeData);
  }

  return (
    <form id="new-trade" onSubmit={submitFormHandler} class="space-y-4">
      <div class="grid grid-rows-4 grid-cols-2 gap-4">
        <div>
          <FormInput
            type="text"
            label="Open Date"
            value={props.tradeInfo.openDate}
            ref={openDateInputRef}
          />
        </div>
        <div class="col-start-2">
          <FormInput
            type="date"
            label="Expiration Date"
            ref={expirationDateInputRef}
          />
        </div>
        <div>
          <FormInput
            type="text"
            label="Ticker"
            value={props.tradeInfo.ticker}
            ref={tickerInputRef}
          />
        </div>
        <div class="col-start-2">
          <FormInput
            type="number"
            min="1"
            value={props.tradeInfo.numContracts}
            label="Number of Contracts"
            ref={numContractInputRef}
          />
        </div>
        <div>
          <FormInput
            type="number"
            step="0.01"
            label="Open Price"
            value={props.tradeInfo.openPrice}
            ref={openPriceInputRef}
          />
        </div>
      </div>

      <div>
        <TextArea
          label="Notes"
          prompt="Why are you making this trade?"
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
