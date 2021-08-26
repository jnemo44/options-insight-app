//Build a new Trade
//Ticker/#Contracts/SellorBuy/OpenPrice/OpenDate/Type
import { useRef, useState } from 'react';
import FormInput from '../UI/Input';
import Button from '../UI/Button';
import BuySellToggle from "../UI/Toggle";
import TextArea from '../UI/TextArea';
import SelectBox from '../UI/SelectBox';
import TradeLegs from '../OpenTrade/TradeLegs';

// Spreads List
const spreads = [
  { id: 1, name: "Single" },
  { id: 2, name: "Vertical" },
  { id: 3, name: "Back/Ratio" },
  { id: 4, name: "Calendar" },
  { id: 5, name: "Diagonal" },
  { id: 6, name: "Straddle" },
  { id: 7, name: "Strangle" },
  { id: 8, name: "Butterfly" },
  { id: 9, name: "Condor" },
  { id: 10, name: "Iron Condor" },
  { id: 11, name: "Vertical Roll" },
  { id: 12, name: "Covered Stock" },
  { id: 13, name: "Collar/Synthetic (Combo)" },
  { id: 14, name: "Custom" },
];

function OpenTradeForm(props) {
  // Create reference objects for the form
  const tickerInputRef = useRef();
  const numContractInputRef = useRef();
  const openPriceInputRef = useRef();
  const openDateInputRef = useRef();
  const expirationDateInputRef = useRef();
  const notesInputRef = useRef();
  const strikeRef = useRef();

  //tickerInputRef.value = "Test";

  // Default to Sell (true)
  const [enabled, setEnabled] = useState(props.edit ? props.tradeInfo.buyOrSell === 'true' : true);

  // Default Selected spread to Vertical
  const [selected, setSelected] = useState(props.edit ? search(props.tradeInfo.spread, spreads) : spreads[1]);

  // Trade Legs State
  const [tradeLegs, setTradeLegs] = useState([])

  const addTradeLegHandler = () => {
    setTradeLegs([...tradeLegs, {strike: "", price: ""}])
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...tradeLegs];
    list[index][name] = value;
    setTradeLegs(list);
  };

  // Helper function for converting date into the format needed for HTML display
  function formatDateToString(date) {
    var DD = (date.getDate() < 10 ? '0' : '')
            + date.getDate();
              
    var MM = ((date.getMonth() + 1) < 10 ? '0' : '')
            + (date.getMonth() + 1);

    var YYYY = date.getFullYear()
              
    return YYYY + "-" + MM + "-" + DD;
  }

  function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
  }

  if (props.edit) {  
    //Test Point
  }
  

  // Set date to today
  //let today = new Date().toISOString().substr(0, 10);
  //document.querySelector("#today").value = today;
  //let today = new Date();

  function submitFormHandler(event) {
    // Stop the page from reloading automatically
    event.preventDefault();

    // Get form values after submission
    const enteredTicker = tickerInputRef.current.value;
    const enteredOpenPrice = openPriceInputRef.current.value;
    const enteredOpenDate = openDateInputRef.current.value;
    const enteredExpirationDate = expirationDateInputRef.current.value;
    const enteredNotes = notesInputRef.current.value;
    const enteredSpread = selected.name;
    const buyOrSell = enabled;
    let enteredNumContracts = numContractInputRef.current.value;
    let id_value = null;

    // If sold display as negative number
    //console.log(buyOrSell);
    if (enabled) {
      enteredNumContracts = -1 * enteredNumContracts;
    } 

    if (props.edit) {
      id_value = props.tradeInfo.id;
    }

    const openTradeData = {
      ticker: enteredTicker,
      numContracts: enteredNumContracts,
      openPrice: enteredOpenPrice,
      openDate: enteredOpenDate,
      expirationDate: enteredExpirationDate,
      buyOrSell: buyOrSell,
      openNotes: enteredNotes,
      spread: enteredSpread,
      adjustment: false,
      closed: false,
      editID: id_value
    };

    // Send data
    console.log("Here")
    props.onAddTrade(openTradeData);
  }


  return (
    <form id='new-trade' onSubmit={submitFormHandler} className="space-y-4">
      <div className="grid grid-rows-4 grid-cols-2 gap-4">
      <div>
        <FormInput
          type="date"
          label="Open Date"
          defaultValue={props.edit ? formatDateToString(new Date(props.tradeInfo.openDate)) : null}
          ref={openDateInputRef} />
      </div>
      <div className='col-start-2'>
        <FormInput
          type="date"
          label="Expiration Date"
          defaultValue={props.edit ? formatDateToString(new Date(props.tradeInfo.expirationDate)) : null}
          ref={expirationDateInputRef} />
      </div>
      <div>
        <FormInput
          type="text"
          label="Ticker"
          defaultValue={props.edit ? props.tradeInfo.ticker : null}
          placeholder="AAPL"
          ref={tickerInputRef} />
      </div>
      <div className='col-start-2'>
        <FormInput
          type="number"
          min="1"
          defaultValue={props.edit ? (props.tradeInfo.numContracts < 0 ? (props.tradeInfo.numContracts * -1) : props.tradeInfo.numContracts) : "1"}
          label="Number of Contracts"
          //placeholder="Number of Contracts"
          ref={numContractInputRef} />
      </div>
      <div>
        <SelectBox
          label="Spread"
          spreads={spreads}
          selected={selected}
          setSelected={setSelected}/>
      </div>
      <div>
        <FormInput
          type="number"
          step="0.01"
          label="Open Price"
          defaultValue={props.edit ? props.tradeInfo.openPrice : null}
          placeholder="Enter Open Price"
          ref={openPriceInputRef} />
      </div>
      <div className='flex justify-center col-span-2'>
        <BuySellToggle 
          enabled={enabled} 
          setEnabled={setEnabled}>  
        </BuySellToggle>
      </div>
      <div>     
        <Button
          type="button"
          //Want to add trade leg info..Strike/Cost/CallorPut
          onClick={addTradeLegHandler}
          name="Add Leg"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        </Button>    
      </div>
      {tradeLegs.map((tradeLeg) => {
        return (
          <div>
          <div>
            <FormInput
            type="number"
            label="Strike"
            placeholder="Enter Strike"
            ref={strikeRef}>
            </FormInput>
          </div>
          <div>
            <FormInput
            type="number"
            label="Price"
            placeholder="Enter Price"
            ref={strikeRef}>
            </FormInput>     
          </div>
          </div>
          
        )
      })
      }
      </div>
      
      <div>
        <TextArea
          label="Notes"
          prompt={props.edit ? props.tradeInfo.openNotes : "Why are you making this trade?"}
          rows="3"
          ref={notesInputRef}>
        </TextArea>
      </div>
      <div className='flex justify-center space-x-20'>
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
            onClick={props.onCancel}
            name="Cancel"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">   
          </Button>
      </div>
      </div>
    </form>
  );

}

export default OpenTradeForm;