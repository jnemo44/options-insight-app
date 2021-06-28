// An Adjustment trade will simply be a combo of an open and a close trade, but will set an adjustment
// flag. This will prevent creating a new adjustment table.

import { useRef } from 'react';
import FormInput from '../UI/Input';
import TextArea from '../UI/TextArea';
import Button from '../UI/Button';

function AdjustTradeForm (props) {
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
            closeNotes: enteredAdjustmentNotes,
          };

        const openTradeData = {
            ticker: props.tradeInfo.ticker,
            numContracts: props.tradeInfo.numContracts,
            openPrice: enteredOpenAdjustmentPrice,
            openDate: enteredAdjustmentDate,
            expirationDate: props.tradeInfo.expirationDate,
            buyOrSell: props.tradeInfo.buyOrSell,
            //openNotes: enteredNotes,
            spread: props.tradeInfo.spread,
            adjustment: true,
        };

        //console.log(tradeAdjustmentData);

    }

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


    return(
        <form id="adjust-trade" onSubmit={submitFormHandler} class="space-y-4">
      <div class="grid grid-rows-4 grid-cols-2 gap-4">
        <div>
          <FormInput
            type="date"
            label="Adjustment Date"
            ref={adjustmentDateInputRef}
          />
        </div>
        <div class="col-start-2">
          <FormInput
            type="text"
            label="Expiration Date"
            value={str}
          />
        </div>
        <div class="col-start-2">
          <FormInput
            type="number"
            min="1"
            value={contractsClosed}
            label="NUmber of Contracts"
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
            label="Close Adjusted Price"
            ref={closeAdjustedPriceInputRef}
          />
        </div>
        <div>
          <FormInput
            type="number"
            step="0.01"
            label="Open Adjusted Price"
            ref={openAdjustedPriceInputRef}
          />
        </div>
      </div>

      <div>
        <TextArea
          label="Notes"
          prompt="Why are you adjusting?"
          rows="3"
          ref={adjustmentNotesInputRef}
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
    )
}

export default AdjustTradeForm;