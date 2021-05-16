//Build a new Trade
//Ticker/#Contracts/SellorBuy/OpenPrice/OpenDate/Type
import { useRef } from 'react';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';

function NewTradeForm(props) {
  // Create reference objects for the form
  const tickerInputRef = useRef();
  const numContractInputRef = useRef();
  const openPriceInputRef = useRef();


  function submitFormHandler(event) {
    // Stop the page from reloading automatically
    event.preventDefault();

    // Get form values after submission
    const enteredTicker = tickerInputRef.current.value;
    const enteredNumContracts = numContractInputRef.current.value;
    const enteredOpenPrice = openPriceInputRef.current.value;

    const newTradeData = {
      ticker: enteredTicker,
      numContracts: enteredNumContracts,
      openPrice: enteredOpenPrice
    };

    // Send data
    console.log(newTradeData);
  }

  return (
    <form onSubmit={submitFormHandler}>
      <div>
        <Input
          //name="ticker"
          type="text"
          label="Ticker"
          placeholder="AAPL"
          ref={tickerInputRef} />
      </div>
      <div>
        <Input
          //name="ticker"
          type="number"
          label="Number of Contracts"
          placeholder="Number of Contracts"
          ref={numContractInputRef} />
      </div>
      <div>
        <Input
          //name="ticker"
          type="number"
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