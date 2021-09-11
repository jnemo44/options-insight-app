import { useState } from "react";
import BootStrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
//import ToolkitProvider, { ColumnToggle } from 'react-bootstrap-table2-toolkit';
//import cellEditFactory from 'react-bootstrap-table2-editor';
import { Modal } from "react-bootstrap";
import Button from "../UI/Button";
import OpenTradeForm from "../OpenTrade/OpenTradeForm";
import CloseTradeForm from "../CloseTrade/CloseTradeForm";
import AdjustTradeForm from "../AdjustTrade/AdjustTradeForm";
import Emoji from "../UI/Emoji";
import Dropdown from "../UI/Dropdown";

function OpenTradeList(props) {
  const [displayTradeInfo, setDisplayTradeInfo] = useState(false);
  const [tradeInfoModal, setTradeInfoModal] = useState([]);
  const [displayCloseTradeForm, setDisplayCloseTradeForm] = useState(false);
  const [displayAdjustTradeForm, setDisplayAdjustTradeForm] = useState(false);
  const [displayEditTradeForm, setDisplayEditTradeForm] = useState(false);
  
  const columns = [
    { dataField: "ticker", text: "Ticker" },
    { dataField: "spread", text: "Spread" },
    { dataField: "dte", text: "DTE" },
    { dataField: "numContracts", text: "Number of Contracts" },
    { dataField: "openPrice", text: "Open Price" },
    { dataField: "currentPrice", text: "Current Price" },
    { dataField: "profitLoss", text: "P/L %" },
  ];

  const rowEvents = {
    onClick: (e, row) => {
      setTradeInfoModal(row);
      displayTradeInfoHandler();
      console.log(tradeInfoModal)
    },
  };

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
    const url = "http://127.0.0.1:5000/open-orders/"+ tradeInfoModal.id
    fetch(url, {
      method: "DELETE",
      headers: { "Content-type": "application/json"},
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
      headers: { "Content-type": "application/json"},
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
    const url = "http://127.0.0.1:5000/open-orders/"+ closeTradeData.openID
    fetch(url, {
      method: "PATCH",
      headers: { "Content-type": "application/json"},
      //mode: 'cors',
      body: JSON.stringify({closed:true}),
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

  function submitAdjustmentTradeHandler(openTradeData, closeTradeData){
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
        closed:true
      }
    } else {
      patchData = {
        //adjustmentID: closeTradeData.adjustmentID,
        closed:true
      }
    } 
    // Patch Request (Set closed flag in open order table) 
    const url = "http://127.0.0.1:5000/open-orders/"+ closeTradeData.openID
    fetch(url, {
      method: "PATCH",
      headers: { "Content-type": "application/json"},
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
      headers: { "Content-type": "application/json"},
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

  function submitEditTradeHandler (openTradeData) {
    console.log(openTradeData)
    const url = "http://127.0.0.1:5000/open-orders/"+ openTradeData.editID
    fetch(url, {
      method: "PATCH",
      headers: { "Content-type": "application/json"},
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
    return (
      <Modal show={displayTradeInfo} onHide={hideTradeInfoHandler}>
        <Modal.Header closeButton>
        <div className="space-y-2 sm:flex sm:justify-end sm:space-x-4 sm:space-y-0">
          <Modal.Title>{tradeInfoModal.ticker}</Modal.Title> 
          <h1>{tradeInfoModal.dte} DTE</h1>
          <Button
            type="button"
            onClick={deleteTradeHandler}
            name="Delete Trade"
            className="btn-delete"></Button>
          <Button
            type="button"
            onClick={editTradeHandler}
            name="Edit Trade"
            className="btn-action"></Button>
             </div>
            </Modal.Header>
           
        <Modal.Body>
          <div><Emoji symbol='📅'/> Trade expires in {tradeInfoModal.dte} days on {tradeInfoModal.expirationDate}</div> 
          <div><Emoji symbol='📅'/> Trade was opened {tradeInfoModal.dit} {tradeInfoModal.dit<2 ? "day": "days"} ago on  {tradeInfoModal.openDate}</div>     
          <div><Emoji symbol='🔢'/> Number of Contracts: {tradeInfoModal.numContracts}</div>
          <div><Emoji symbol='💰'/> Open Price: {tradeInfoModal.openPrice}</div>
          <div><Emoji symbol='📋'/> Notes: {tradeInfoModal.openNotes}</div>
          <div>{tradeInfoModal.tradeLegs.map((leg, index) => {
              return(
                <div>Leg #{index + 1} Strike {leg.legStrike} Price {leg.legPrice}</div>
              ) 
          })}</div>
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
      <BootStrapTable  
        keyField="id"
        data={props.trades}
        columns={columns}
        pagination={paginationFactory()}
        rowEvents={rowEvents}
        hover
        striped
      />    
      {
        // if...else if...else to conditionaly render modals
        displayCloseTradeForm ? <CloseTradeModal tradeInfo={tradeInfoModal}/> : 
        displayAdjustTradeForm ? <AdjustTradeModal tradeInfo={tradeInfoModal}/> :
        displayEditTradeForm ? <EditTradeModal tradeInfo={tradeInfoModal}/> :
        <TradeInfoModal/>
      }
    </div>
  );
}

export default OpenTradeList;
