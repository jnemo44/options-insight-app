//Build a new Trade
//Ticker/#Contracts/SellorBuy/OpenPrice/OpenDate/Type
import { useRef, useState } from 'react';
import FormInput from '../UI/Input';
import Button from '../UI/Button';
import BuySellToggle from "../UI/Toggle";
import TextArea from '../UI/TextArea';
import SelectBox from '../UI/SelectBox';
import TradeLegs from '../NewTrade/TradeLegs';

function NewTradeForm(props) {
  // Create reference objects for the form
  const tickerInputRef = useRef();
  const numContractInputRef = useRef();
  const openPriceInputRef = useRef();
  const openDateInputRef = useRef();
  const expirationDateInputRef = useRef();
  const notesInputRef = useRef();

  // Default to Sell (true)
  const [enabled, setEnabled] = useState(true);

  // Set date to today
  //let today = new Date().toISOString().substr(0, 10);
  //document.querySelector("#today").value = today;
  let today = new Date();
  console.log(today)

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
    const buyOrSell = enabled;

    // If sold display as negative number
    if (enabled) {
      enteredNumContracts = -1 * enteredNumContracts;
    } 

    const newTradeData = {
      ticker: enteredTicker,
      numContracts: enteredNumContracts,
      openPrice: enteredOpenPrice,
      openDate: enteredOpenDate,
      expirationDate: enteredExpirationDate,
      buyOrSell: buyOrSell,
      notes: enteredNotes
    };

    // Send data
    props.onAddTrade(newTradeData);
  }


  return (
    <form onSubmit={submitFormHandler} class="space-y-4">
      <div class="grid grid-rows-4 grid-cols-2 gap-4">
      <div>
        <FormInput
          type="date"
          label="Open Date"
          placeholder="Enter Open Date"
          ref={openDateInputRef} />
      </div>
      <div class='col-start-2'>
        <FormInput
          type="date"
          label="Expiration Date"
          placeholder="Enter Expiration Date"
          ref={expirationDateInputRef} />
      </div>
      <div>
        <FormInput
          type="text"
          label="Ticker"
          placeholder="AAPL"
          ref={tickerInputRef} />
      </div>
      <div class='col-start-2'>
        <FormInput
          type="number"
          label="Number of Contracts"
          placeholder="Number of Contracts"
          //value={enabled ? -value : value}
          ref={numContractInputRef} />
      </div>
      <div>
        <SelectBox
          label="Spread"></SelectBox>
      </div>
      <div>
        <FormInput
          type="number"
          step="0.01"
          label="Open Price"
          placeholder="Enter Open Price"
          ref={openPriceInputRef} />
      </div>
      <div class='flex justify-center col-span-2'>
        <BuySellToggle 
          enabled={enabled} 
          setEnabled={setEnabled}>  
        </BuySellToggle>
      </div>
      {/* <div class='row-start-4 col-span-2'>
        <TradeLegs></TradeLegs>
      </div> */}
      
      </div>
      
      <div>
        <TextArea
          label="Notes"
          prompt="Why are you making this trade?"
          rows="3"
          ref={notesInputRef}>

        </TextArea>
      </div>
      
      <div>
          <Button 
            type="submit" 
            name="Submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">   
          </Button>
      </div>
      <div>
          <Button 
            type="button" 
            name="Cancel"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">   
          </Button>
      </div>
    </form>
  );

}

export default NewTradeForm;