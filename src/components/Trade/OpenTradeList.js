import { useState } from "react";
import BootStrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
//import cellEditFactory from 'react-bootstrap-table2-editor';
import { Modal } from "react-bootstrap";
import Button from "../UI/Button";
import CloseTradeForm from "../CloseTrade/CloseTradeForm";
import AdjustTradeForm from "../AdjustTrade/AdjustTradeForm";
import Emoji from "../UI/Emoji";

function OpenTradeList(props) {
  const [displayTradeInfo, setDisplayTradeInfo] = useState(false);
  const [tradeInfoModal, setTradeInfoModal] = useState([]);
  const [displayCloseTradeForm, setDisplayCloseTradeForm] = useState(false);
  const [displayAdjustTradeForm, setDisplayAdjustTradeForm] = useState(false);
  

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
        console.log('Response Status', response.status);
        return response.json();
      })
      .then((data) => {
        console.log(data);
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

  function submitAdjustmentTradeHandler(openTradeData, closeTradeData){
    let patchData = {};
    console.log(openTradeData.adjustmentID)

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
      console.log("Post" + data)
      // Trigger Page Reload
      props.modified();
    });

    // Build JSON data for PATCH request
    if (openTradeData.adjustmentID === null) {
      patchData = {
        // This is to link the original openID to all future adjustments
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
        console.log('Response Status', response.status);
        return response.json();
      })
      .then((data) => {
        console.log("Patch" + data);
      });

    // Post Request
    fetch("http://127.0.0.1:5000/close-orders", {
      method: "POST",
      headers: { "Content-type": "application/json"},
      //mode: 'cors',
      body: JSON.stringify(closeTradeData),
    })
      .then((response) => {
        console.log('Response Status', response.status);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        hideAdjustTradeFormHandler();
      });
  }

  const TradeInfoModal = () => {
    console.log(tradeInfoModal)
    let openDate = new Date(tradeInfoModal.openDate);
    let expirationDate = new Date(tradeInfoModal.expirationDate);
    let od = openDate.toDateString(openDate);
    let ed = expirationDate.toDateString(expirationDate);
    return (
      <Modal show={displayTradeInfo} onHide={hideTradeInfoHandler}>
        <Modal.Header closeButton>
          <Modal.Title>{tradeInfoModal.ticker}</Modal.Title>
          <h1>{tradeInfoModal.dte} DTE</h1>
          <Button
            type="button"
            onClick={deleteTradeHandler}
            name="Delete Trade"
            className="inline-flex items-right px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"></Button>
        </Modal.Header>
        <Modal.Body>
          <div><Emoji symbol='📅'/> Trade expires in {tradeInfoModal.dte} days on  {ed}</div> 
          <div><Emoji symbol='📅'/> Trade was opened {tradeInfoModal.dit} {tradeInfoModal.dit<2 ? "day": "days"} ago on  {od}</div>     
          <div><Emoji symbol='🔢'/> Number of Contracts: {tradeInfoModal.numContracts}</div>
          <div><Emoji symbol='💰'/> Open Price: {tradeInfoModal.openPrice}</div>
          <div><Emoji symbol='📋'/> Notes: {tradeInfoModal.openNotes}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            onClick={closeTradeHandler}
            name="Close Position"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          ></Button>
          <Button
            type="button"
            onClick={adjustTradeHandler}
            name="Adjust Position"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          ></Button>
          <Button
            type="button"
            onClick={hideTradeInfoHandler}
            name="Cancel"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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



  return (
    <div>
      <BootStrapTable
        keyField="ticker"
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
        <TradeInfoModal/>
      }
    </div>
  );
}

export default OpenTradeList;
