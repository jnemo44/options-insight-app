// An Adjustment trade will simply be a combo of an open and a close trade, but will set an adjustment
// flag. This will prevent creating a new adjustment table.

import { useRef } from 'react';
import FormInput from '../UI/Input';
import TextArea from '../UI/TextArea';
import Button from '../UI/Button';

function AdjustTradeForm(props) {
  // Create Reference Objects for any entered data
  const adjustmentDateInputRef = useRef();
  const openAdjustedPriceInputRef = useRef();
  const closeAdjustedPriceInputRef = useRef();
  const adjustmentNotesInputRef = useRef();

  let contractsClosed = props.tradeInfo.numContracts;
  console.log(props.tradeInfo)

  // Submit Adjustment Data to Server
  function submitFormHandler(event) {
    // Stop the page from reloading automatically
    event.preventDefault();

    // Get data from inputs
    const enteredAdjustmentDate = adjustmentDateInputRef.current.value;
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
      expirationDate: props.tradeInfo.expirationDate,
      buyOrSell: props.tradeInfo.buyOrSell,
      //openNotes: enteredNotes,
      spread: props.tradeInfo.spread,
      closed: false,
      adjustment: true,
      adjustmentID: props.tradeInfo.adjustmentID,
    };

    props.onAdjustTrade(openTradeData, closeTradeData);

  }

  // Buy or Sell
  if (props.tradeInfo.buyOrSell === "true") {
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
            type="text"
            label="Expiration Date"
            value={dateStr}
            readOnly={true} />
        </div>
        <div>
          <FormInput
            type="number"
            min="1"
            value={contractsClosed}
            label="Number of Contracts"
            readOnly={true} />
        </div>
        <div>
          <FormInput
            type="number"
            step="0.01"
            label="Open Price"
            value={props.tradeInfo.openPrice}
            readOnly={true}
          />
        </div>
        <div>
          <FormInput
            type="number"
            step="0.01"
            label="Close Adjusted Price"
            ref={closeAdjustedPriceInputRef} />
        </div>
        <div>
          <FormInput
            type="number"
            step="0.01"
            label="Open Adjusted Price"
            ref={openAdjustedPriceInputRef} />
        </div>
        <div>
          Placeholder
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