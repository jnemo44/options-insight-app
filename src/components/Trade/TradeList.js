import { useState } from "react";
import BootStrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Modal } from "react-bootstrap";
import Button from "../UI/Button";
import CloseTradeForm from "../CloseTrade/CloseTradeForm";

//import Modal from "../UI/Modal";

function TradeList(props) {
  const [displayTradeInfo, setDisplayTradeInfo] = useState(false);
  const [tradeInfoModal, setTradeInfoModal] = useState([]);
  const [displayCloseTradeForm, setDisplayCloseTradeForm] = useState(false);
  

  const columns = [
    { dataField: "ticker", text: "Ticker" },
    { dataField: "spread", text: "Spread" },
    { dataField: "dte", text: "DTE" },
    { dataField: "numContracts", text: "Number of Contracts" },
    { dataField: "openPrice", text: "Open Price" },
    { dataField: "currentPrice", text: "Current Price" },
    { dataField: "profitLoss", text: "P/L %" },
    { dataField: "closedTrade", text: "Closed?" },
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

  function closeTradeHandler() {
    // Hide Trade Info Modal
    hideTradeInfoHandler();
    // Display Form Modal
    displayCloseTradeFormHandler();
  }

  function submitCloseTradeHandler(closeTradeData) {
    console.log('Close Trade', closeTradeData);

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


  }

    
  

  const TradeInfoModal = () => {
    return (
      <Modal show={displayTradeInfo} onHide={hideTradeInfoHandler}>
        <Modal.Header closeButton>
          <Modal.Title>{tradeInfoModal.ticker}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Number of Contracts: {tradeInfoModal.numContracts}</div>
          <div>Days till Expiration: {tradeInfoModal.dte}</div>
          <div>Days in Trade: {tradeInfoModal.dit}</div>
          <div>Open Price: {tradeInfoModal.openPrice}</div>
          <div>Notes: {tradeInfoModal.openNotes}</div>
          <div>Closed?: {tradeInfoModal.closedTrade}</div>
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
            onClick={displayTradeInfoHandler}
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
        {/* <Modal.Footer>
          <Button
            type="button"
            onClick={hideCloseTradeFormHandler}
            name="Adjust Position"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          ></Button>
          <Button
            type="button"
            onClick={hideCloseTradeFormHandler}
            name="Cancel"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          ></Button> 
        </Modal.Footer>*/}
      </Modal>
    );
  };

  return (
    <div>
      <BootStrapTable
        keyField="name"
        data={props.trades}
        columns={columns}
        pagination={paginationFactory()}
        rowEvents={rowEvents}
        hover
      />
      {displayCloseTradeForm ? <CloseTradeModal tradeInfo={tradeInfoModal}/> : <TradeInfoModal />}
    </div>
  );
}

export default TradeList;
