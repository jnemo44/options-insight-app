import { React, useState } from "react";
import TradeListTable from "./TradeListTable";
import { Modal } from "react-bootstrap";
import Button from "../UI/Buttons";
import OpenTradeForm from "../OpenTrade/OpenTradeForm";
import CloseTradeForm from "../CloseTrade/CloseTradeForm";
import AdjustTradeForm from "../AdjustTrade/AdjustTradeForm";
import Emoji from "../UI/Emoji";
import Dropdown from "../UI/Dropdown";
import AdjustTradeList from "../AdjustTrade/AdjustTradeList";
import TradeHistory from "../TradeHistory/TradeHistory";

function OpenTradeList(props) {
  const [displayTradeInfo, setDisplayTradeInfo] = useState(false);
  const [tradeInfoModal, setTradeInfoModal] = useState([]);
  const [displayCloseTradeForm, setDisplayCloseTradeForm] = useState(false);
  const [displayAdjustTradeForm, setDisplayAdjustTradeForm] = useState(false);
  const [displayEditTradeForm, setDisplayEditTradeForm] = useState(false);

  function onRowSelectHandler(trade, event) {
    setTradeInfoModal(trade.original);
    displayTradeInfoHandler();
  }

  function displayTradeInfoHandler() {
    // Display Modal to view trade details
    setDisplayTradeInfo(true);
  }

  function hideTradeInfoHandler() {
    // Hide Modal on cancel
    setDisplayTradeInfo(false);
  }

  function displayCloseTradeFormHandler() {
    // Display Modal to view trade details
    setDisplayCloseTradeForm(true);
  }

  function hideCloseTradeFormHandler() {
    // Hide Modal on cancel
    setDisplayCloseTradeForm(false);
  }

  function hideAdjustTradeFormHandler() {
    // Hide Modal on cancel
    setDisplayAdjustTradeForm(false);
  }

  function hideEditTradeFormHandler() {
    // Hide Modal on cancel
    setDisplayEditTradeForm(false);
  }

  function closeTradeHandler() {
    // Hide Trade Info Modal
    hideTradeInfoHandler();
    // Display Form Modal
    displayCloseTradeFormHandler();
  }

  function adjustTradeHandler() {
    // Hide Trade Info Modal
    hideTradeInfoHandler();
    // Display Form Modal
    setDisplayAdjustTradeForm(true);
  }

  function editTradeHandler() {
    // Hide Trade Info Modal
    hideTradeInfoHandler();
    // Display Form Modal
    setDisplayEditTradeForm(true);
  }

  function deleteTradeHandler() {
    // Delete Request
    const url = "http://127.0.0.1:5000/open-orders/" + tradeInfoModal.id
    fetch(url, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        console.log('Response Status', response.status);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        hideCloseTradeFormHandler();
      });

    // Trigger Page Reload
    props.modified();
  }

  function submitCloseTradeHandler(closeTradeData) {
    // Post Request
    fetch("http://127.0.0.1:5000/close-orders", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      //mode: 'cors',
      body: JSON.stringify(closeTradeData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        hideCloseTradeFormHandler();
      });

    // Patch Request (Set closed flag in open order table) 
    const url = "http://127.0.0.1:5000/open-orders/" + closeTradeData.openID
    fetch(url, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      //mode: 'cors',
      body: JSON.stringify({ closed: true }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        hideCloseTradeFormHandler();
      });

    // Trigger Page Reload
    props.modified();
  }

  function submitAdjustmentTradeHandler(openTradeData, closeTradeData) {
    let patchData = {};

    // Post Trade to backend
    fetch("http://127.0.0.1:5000/open-orders", {
      method: "POST",
      body: JSON.stringify(openTradeData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      return response.json();
    }).then((data) => {
      // Trigger Page Reload
      props.modified();
    });

    // Build JSON data for PATCH request.
    if (openTradeData.adjustmentID === null) {
      patchData = {
        // This is to link the original openID to all future adjustments.
        // It is sent to patch the original open trade with the adjustment ID.
        adjustmentID: closeTradeData.openID,
        closed: true
      }
    } else {
      patchData = {
        //adjustmentID: closeTradeData.adjustmentID,
        closed: true
      }
    }
    // Patch Request (Set closed flag in open order table) 
    const url = "http://127.0.0.1:5000/open-orders/" + closeTradeData.openID
    fetch(url, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      //mode: 'cors',
      body: JSON.stringify(patchData),
    })
      .then((response) => {
        console.log(response.status);
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });

    // Post Request
    fetch("http://127.0.0.1:5000/close-orders", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      //mode: 'cors',
      body: JSON.stringify(closeTradeData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        hideAdjustTradeFormHandler();
      });
  }

  function submitEditTradeHandler(openTradeData) {
    console.log(openTradeData)
    const url = "http://127.0.0.1:5000/open-orders/" + openTradeData.editID
    fetch(url, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(openTradeData),
    })
      .then((response) => {
        console.log(response.status);
        return response.json();
      })
      .then((data) => {
        // Trigger Page Reload
        props.modified();
      });
    // I think I need to trigger a page refresh somehow...
  }

  const TradeInfoModal = () => {
    let tradeInfo = { ...tradeInfoModal };
    delete tradeInfo.tradeHistory;
    delete tradeInfo.tradeLegs;

    return (
      <Modal show={displayTradeInfo} onHide={hideTradeInfoHandler} size="xl">
        <Modal.Header closeButton>
          <div className="space-y-2 sm:flex sm:justify-end sm:space-x-4 sm:space-y-0">
            <Modal.Title>{tradeInfoModal.ticker}</Modal.Title>
            <h1>{tradeInfoModal.dte} DTE</h1>
          </div>
        </Modal.Header>

        <Modal.Body>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Open Date</dt>
              <dd className="mt-1 text-sm text-gray-900">{tradeInfoModal.openDate}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Expiration Date</dt>
              <dd className="mt-1 text-sm text-gray-900">{tradeInfoModal.expirationDate}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">DIT</dt>
              <dd className="mt-1 text-sm text-gray-900">{tradeInfoModal.dit}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Number of Contracts</dt>
              <dd className="mt-1 text-sm text-gray-900">{tradeInfoModal.numContracts}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Open Price</dt>
              <dd className="mt-1 text-sm text-gray-900">{tradeInfoModal.openPrice}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Spread</dt>
              <dd className="mt-1 text-sm text-gray-900">{tradeInfoModal.spread}</dd>
            </div>
            {tradeInfoModal.openNotes == null ? null : tradeInfoModal.openNotes.length === 0 ? null :
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Open Notes</dt>
                <dd className="mt-1 text-sm text-gray-900">{tradeInfoModal.openNotes}</dd>
              </div>}
          </dl>
          {/* <div><Emoji symbol='📅'/> Trade expires in {tradeInfoModal.dte} {tradeInfoModal.dte<2 ? "day": "days"} on {tradeInfoModal.expirationDate}</div> 
          <div><Emoji symbol='📅'/> Trade was opened {tradeInfoModal.dit} {tradeInfoModal.dit<2 ? "day": "days"} ago on  {tradeInfoModal.openDate}</div>     
          <div><Emoji symbol='🔢'/> Number of Contracts: {tradeInfoModal.numContracts}</div>
          <div><Emoji symbol='💰'/> Open Price: {tradeInfoModal.openPrice}</div>
          <div><Emoji symbol='📋'/> Notes: {tradeInfoModal.openNotes}</div>
          <div><Emoji symbol='🦵'/> Trade Legs</div> */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-md font-medium text-gray-900">Trade History</span>
            </div>
          </div>
          <div><TradeHistory tradeHistory={tradeInfoModal.tradeHistory}></TradeHistory></div>
          {/* <div className="relative py-4">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-md font-medium text-gray-900">Trade Legs</span>
            </div>
          </div>
          <ul role="list" className="divide-y divide-gray-200">
            <div>{Array.isArray(tradeInfoModal.tradeLegs) ? tradeInfoModal.tradeLegs.map((leg, index) => {
              console.log(leg)
              return (
                <li key={index} className="px-4 py-0 sm:px-0">
                  <div className="flex flex-row gap-x-5">
                    <div>{leg.legStrike}</div>
                    <div>{leg.legExpiration}</div>
                    <div>{leg.legSide === true ? "Call" : "Put"}</div>                  
                    <div>{leg.legPrice}</div>
                  </div>
                </li>
              )
            }) : null}</div>
          </ul> */}
          
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            onClick={closeTradeHandler}
            name="Close Position"
            className="btn-action"
          ></Button>
          <Button
            type="button"
            onClick={adjustTradeHandler}
            name="Adjust Position"
            className="btn-action"
          ></Button>
          <Dropdown
            edit={editTradeHandler}
            delete={deleteTradeHandler}
          />
          <Button
            type="button"
            onClick={hideTradeInfoHandler}
            name="Cancel"
            className="btn-cancel"
          ></Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const CloseTradeModal = (props) => {
    return (
      <Modal show={displayCloseTradeForm} onHide={hideCloseTradeFormHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Closing Trade Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CloseTradeForm
            tradeInfo={props.tradeInfo}
            onCancel={hideCloseTradeFormHandler}
            onCloseTrade={submitCloseTradeHandler}></CloseTradeForm>
        </Modal.Body>
      </Modal>
    );
  };

  const AdjustTradeModal = (props) => {
    return (
      <Modal show={displayAdjustTradeForm} onHide={hideAdjustTradeFormHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Adjustment Trade Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AdjustTradeForm
            tradeInfo={props.tradeInfo}
            onAdjustTrade={submitAdjustmentTradeHandler}
            onCancel={hideAdjustTradeFormHandler}></AdjustTradeForm>
        </Modal.Body>
      </Modal>
    );
  };

  const EditTradeModal = (props) => {
    return (
      <Modal show={displayEditTradeForm} onHide={hideEditTradeFormHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Trade Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OpenTradeForm
            tradeInfo={props.tradeInfo}
            edit={true}
            onAddTrade={submitEditTradeHandler}
            onCancel={hideEditTradeFormHandler}>
          </OpenTradeForm>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <div>
      {/* <TradeListTable trades={props.trades} onRowSelect={onRowSelectHandler}/> */}
      <TradeListTable
        onRowSelect={onRowSelectHandler}
        columns={props.columns}
        data={props.trades}
      >
      </TradeListTable>
      {
        // if...else if...else to conditionaly render modals
        displayCloseTradeForm ? <CloseTradeModal tradeInfo={tradeInfoModal} /> :
          displayAdjustTradeForm ? <AdjustTradeModal tradeInfo={tradeInfoModal} /> :
            displayEditTradeForm ? <EditTradeModal tradeInfo={tradeInfoModal} /> :
              <TradeInfoModal />
      }
    </div>
  );
}

export default OpenTradeList;
