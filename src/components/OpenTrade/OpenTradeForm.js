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

  // Default to Sell (true)
  const [enabled, setEnabled] = useState(props.edit ? props.tradeInfo.buyOrSell === 'true' : true);

  // Default Selected spread to Vertical
  const [selected, setSelected] = useState(props.edit ? search(props.tradeInfo.spread, spreads) : spreads[1]);

  // Trade Legs State
  const [tradeLegs, setTradeLegs] = useState(props.edit ? props.tradeInfo.tradeLegs : [])

  // Trade Leg Price Summation
  const [totalOpenPrice, setTotalOpenPrice] = useState(props.edit ? props.tradeInfo.openPrice : null)

  const addTradeLegHandler = () => {
    setTradeLegs([...tradeLegs, { legStrike: "", legPrice: "" }])
    console.log(tradeLegs)
  };

  const removeTradeLegHandler = (i) => {
    let newTradeLegs = [...tradeLegs];
    newTradeLegs.splice(i, 1)
    setTradeLegs(newTradeLegs)
  }

  const handleInputChange = (index, e) => {
    let newTradeLegs = [...tradeLegs];
    newTradeLegs[index][e.target.name] = e.target.value
    setTradeLegs(newTradeLegs);
    if (e.target.name === "legPrice") {
      var total = 0
      for (const leg of tradeLegs) {
        isNaN(parseFloat(leg.legPrice)) ? total += 0 : total += parseFloat(leg.legPrice)    
      }
      setTotalOpenPrice(total.toFixed(2))
    }
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

  function search(nameKey, myArray) {
    for (var i = 0; i < myArray.length; i++) {
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
      editID: id_value,
      tradeLegs: tradeLegs,
    };

    // Send data
    props.onAddTrade(openTradeData);
  }


  return (
    <form id='new-trade' onSubmit={submitFormHandler}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <FormInput
            type="date"
            label="Open Date"
            defaultValue={props.edit ? formatDateToString(new Date(props.tradeInfo.openDate)) : null}
            ref={openDateInputRef} />
        </div>
        <div>
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
        <div>
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
            setSelected={setSelected} />
        </div>
        <div>
          <FormInput
            type="number"
            step="0.01"
            label="Open Price"
            //defaultValue={props.edit ? props.tradeInfo.openPrice : null}
            value={totalOpenPrice}
            placeholder="Enter Open Price"
            ref={openPriceInputRef} />
        </div>
        <div className="grid col-span-1 justify-center sm:col-span-2">
          <BuySellToggle
            enabled={enabled}
            setEnabled={setEnabled}>
          </BuySellToggle>
        </div>
        <div className="grid col-span-1 justify-center sm:col-span-2">
          <Button
            type="button"
            //Want to add trade leg info..Strike/Cost/CallorPut
            onClick={addTradeLegHandler}
            name="Add Leg"
            className="btn-action">
          </Button>
        </div>
        {tradeLegs.map((element, index) => {
          return (
            <div className="grid">        
              <div className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label htmlFor="legStrike" className="block text-xs font-medium text-gray-900">
              Strike
              </label>
              <input
                type="text"
                name="legStrike"
                id={"Strike" + index}
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                placeholder="Enter Strike"
                defaultValue={(props.edit && index in props.tradeInfo.tradeLegs) ? props.tradeInfo.tradeLegs[index].legStrike : null}
                onChange={e => handleInputChange(index, e)}
              />
              </div>
              <div className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
              <label htmlFor="legPrice" className="block text-xs font-medium text-gray-900">
              Price
              </label>
              <input
                type="number"
                name="legPrice"
                step="0.01"
                id={"Price" + index}
                className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                placeholder="Enter Price"
                defaultValue={(props.edit && index in props.tradeInfo.tradeLegs) ? props.tradeInfo.tradeLegs[index].legPrice : null}
                onChange={e => handleInputChange(index, e)}
              />
              </div>
              <div className="flex content-center">
                <Button
                  type="button"
                  onClick={() => removeTradeLegHandler(index)}
                  name="Delete"
                  className="btn-delete"
                  >
                </Button> 
              </div>
              {/* <div>
                <FormInput
                  type="number"
                  label="Strike"
                  name="legStrike"
                  placeholder="Enter Strike"
                  defaultValue={props.edit ? props.tradeInfo.tradeLegs[index].legStrike : null}
                  onChange={e => handleInputChange(index, e)}>
                </FormInput>
              </div>
              <div>
                <FormInput
                  type="number"
                  step="0.01"
                  label="Price"
                  name="legPrice"
                  placeholder="Enter Price"
                  defaultValue={props.edit ? props.tradeInfo.tradeLegs[index].legPrice : null}
                  onChange={e => handleInputChange(index, e)}>
                </FormInput>
              </div>
              <div>
                <Button
                  type="button"
                  onClick={() => removeTradeLegHandler(index)}
                  name="Delete"
                  className="btn-delete"
                  >
                </Button> 
              </div>  */}
            </div>
          )
        })
        }
        <div className="grid col-span-1 sm:col-span-2">
          <TextArea
            label="Notes"
            prompt={props.edit ? props.tradeInfo.openNotes : "Why are you making this trade?"}
            rows="3"
            ref={notesInputRef}>
          </TextArea>
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

export default OpenTradeForm;