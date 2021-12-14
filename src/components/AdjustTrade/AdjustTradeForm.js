// An Adjustment trade will simply be a combo of an open and a close trade, but will set an adjustment
// flag. This will prevent creating a new adjustment table.

import { useRef, useState } from 'react';
import FormInput from '../UI/Input';
import TextArea from '../UI/TextArea';
import Button from '../UI/Buttons';

function AdjustTradeForm(props) {
  // Create Reference Objects for any entered data
  const adjustmentDateInputRef = useRef();
  const openAdjustedPriceInputRef = useRef();
  const closeAdjustedPriceInputRef = useRef();
  const adjustmentNotesInputRef = useRef();
  const adjustmentExpirationDateInputRef = useRef();
  const [PLResult, setPLResult] = useState(0.00);
  const positivePL = "grid col-span-1 sm:col-span-2 justify-items-center text-2xl text-green-600";
  const negativePL = "grid col-span-1 sm:col-span-2 justify-items-center text-2xl text-red-600";

  let contractsClosed = parseInt(props.tradeInfo.numContracts);
  console.log(props.tradeInfo)

  function closePriceHandler(event) {
    // Buy or Sell (false is buy)
    if (props.tradeInfo.buyOrSell == "sell") {
      //Dynamically calculate PL Result
      setPLResult((parseFloat(props.tradeInfo.openPrice.replace(/\$/g,'')))+parseFloat(closeAdjustedPriceInputRef.current.value)-parseFloat(openAdjustedPriceInputRef.current.value))
    }
    else {
      console.log(props.tradeInfo.openPrice)
      //Dynamically calculate PL Results
      setPLResult(parseFloat(props.tradeInfo.openPrice.replace(/\$/g,''))-parseFloat(closeAdjustedPriceInputRef.current.value)+parseFloat(openAdjustedPriceInputRef.current.value))
    }
    console.log(PLResult)
  }

  // Submit Adjustment Data to Server
  function submitFormHandler(event) {
    // Stop the page from reloading automatically
    event.preventDefault();

    // Get data from inputs
    const enteredAdjustmentDate = adjustmentDateInputRef.current.value;
    const enteredAdjustmentExpirationDate = adjustmentExpirationDateInputRef.current.value;
    const enteredClosedAdjustmentPrice = closeAdjustedPriceInputRef.current.value;
    const enteredOpenAdjustmentPrice = openAdjustedPriceInputRef.current.value;
    const enteredAdjustmentNotes = adjustmentNotesInputRef.current.value;

    const closeTradeData = {
      openID: props.tradeInfo.id,
      numContracts: props.tradeInfo.numContracts,
      closePrice: enteredClosedAdjustmentPrice,
      closeDate: enteredAdjustmentDate,
      buyOrSell: props.tradeInfo.buyOrSell,
      adjustment: true,
      adjustmentID: props.tradeInfo.adjustmentID,
      closeNotes: enteredAdjustmentNotes,
    };

    const openTradeData = {
      openID: props.tradeInfo.id, // This openID will be used to track adjustments
      ticker: props.tradeInfo.ticker,
      numContracts: props.tradeInfo.numContracts,
      openPrice: enteredOpenAdjustmentPrice,
      openDate: enteredAdjustmentDate,
      expirationDate: enteredAdjustmentExpirationDate,
      buyOrSell: props.tradeInfo.buyOrSell,
      //openNotes: enteredNotes,
      spread: props.tradeInfo.spread,
      closed: false,
      adjustment: true,
      adjustmentID: props.tradeInfo.adjustmentID,
    };

    // Function passed from OpenTradeList
    props.onAdjustTrade(openTradeData, closeTradeData);

  }

  // Buy or Sell
  if (props.tradeInfo.buyOrSell === "sell") {
    contractsClosed = props.tradeInfo.numContracts * -1
  }

  // Convert Date
  console.log(props.tradeInfo.expirationDate)
  var myDate = new Date(props.tradeInfo.expirationDate)
  console.log(myDate)
  var dateStr = myDate.toDateString()

  return (
    // class="space-y-4"
    <form id="adjust-trade" onSubmit={submitFormHandler} >
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4" >
        <div>
          <FormInput
            type="date"
            label="Adjustment Date"
            ref={adjustmentDateInputRef} />
        </div>
        <div>
          <FormInput
            type="date"
            label="Adjustment Expiration Date"
            ref={adjustmentExpirationDateInputRef}/>
        </div>
        <div>
          <FormInput
            type="text"
            //min="1"
            value={(props.tradeInfo.buyOrSell == "buy" ? "+" : "-") + contractsClosed}
            label={"Number of Contracts " + (props.tradeInfo.buyOrSell == "buy" ? "Bought" : "Sold")}
            readOnly={true} />
        </div>
        <div>
          <FormInput
            type="number"
            step="0.01"
            label="Previous Trade Open Price"
            value={parseFloat(props.tradeInfo.openPrice.replace(/\$/g,''))}
            readOnly={true}
          />
        </div>
        <div>
          <FormInput
            type="number"
            step="0.01"
            label="Previous Trade Close Price"
            onChange={closePriceHandler}
            ref={closeAdjustedPriceInputRef} />
        </div>
        <div>
          <FormInput
            type="number"
            step="0.01"
            label="Adjustment Open Price"
            onChange={closePriceHandler}
            ref={openAdjustedPriceInputRef} />
        </div>
        <div class={PLResult > 0 ? positivePL : negativePL}>
          {props.tradeInfo.buyOrSell == "buy" ? <p>Sell to Close previous trade</p> : <p>Buy to Close previous trade</p>}
          {props.tradeInfo.buyOrSell == "buy" ? <p>Buy to Open adjustment</p> : <p>Sell to Open adjustment</p>}
          {PLResult > 0 ? <p>Rolling for a credit of {PLResult.toFixed(2)}</p> : <p>Rolling for a debit of {PLResult.toFixed(2)}</p>} 
        </div>
        <div class="grid col-span-1 sm:col-span-2">
          <TextArea
            label="Notes"
            prompt="Why are you adjusting?"
            rows="3"
            ref={adjustmentNotesInputRef}
          ></TextArea>
        </div>
        <div className="btn-resize sm:col-span-2">
          <div>
            <Button
              type="submit"
              name="Submit"
              className="btn-action"
            ></Button>
          </div>
          <div>
            <Button
              type="button"
              onClick={props.onCancel}
              name="Cancel"
              className="btn-cancel"
            ></Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default AdjustTradeForm;