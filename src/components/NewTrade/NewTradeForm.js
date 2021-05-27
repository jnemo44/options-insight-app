//Build a new Trade
//Ticker/#Contracts/SellorBuy/OpenPrice/OpenDate/Type
import { useRef, useState } from 'react';
import FormInput from '../UI/Input';
import Button from '../UI/Button';
import BuySellToggle from "../UI/Toggle";

function NewTradeForm(props) {
  // Create reference objects for the form
  const tickerInputRef = useRef();
  const numContractInputRef = useRef();
  const openPriceInputRef = useRef();
  const openDateInputRef = useRef();
  const expirationDateInputRef = useRef();

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
      buyOrSell: buyOrSell
    };

    // Send data
    console.log(newTradeData);
    props.onAddTrade(newTradeData);
  }


  return (
    <form onSubmit={submitFormHandler} class="space-y-3">
      <div>
        <FormInput
          type="date"
          label="Open Date"
          placeholder="Enter Open Date"
          ref={openDateInputRef} />
      </div>
      <div>
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
      <div>
        <FormInput
          type="number"
          label="Number of Contracts"
          placeholder="Number of Contracts"
          ref={numContractInputRef} />
      </div>
      <div>
        <BuySellToggle enabled={enabled} setEnabled={setEnabled}></BuySellToggle>
      </div>
      <div>
        <FormInput
          type="number"
          step="0.01"
          label="Open Price"
          placeholder="Enter Open Price"
          ref={openPriceInputRef} />
      </div>
      
      <div>
          <Button></Button>
      </div>
    </form>
  );

}

export default NewTradeForm;