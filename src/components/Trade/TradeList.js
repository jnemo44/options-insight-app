import { useState } from "react";
import BootStrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Modal } from "react-bootstrap";
import Button from "../UI/Button";
import NewTradeForm from "../NewTrade/NewTradeForm";

//import Modal from "../UI/Modal";

function TradeList(props) {
  const [displayTrade, setDisplayTrade] = useState(false);
  const [modalInfo, setModalInfo] = useState();

  const columns = [
    { dataField: "ticker", text: "Ticker" },
    { dataField: "spread", text: "Spread" },
    { dataField: "dte", text: "DTE" },
    { dataField: "numContracts", text: "Number of Contracts" },
    { dataField: "openPrice", text: "Open Price" },
    { dataField: "currentPrice", text: "Current Price" },
    { dataField: "profitLoss", text: "P/L %" },
  ];

  const modalAction = {
    buttonTitle: "Submit",
    buttonType: "submit",
  };

  const rowEvents = {
    onClick: (e, row) => {
      setModalInfo(row);
      displayTradeHandler();
    },
  };

  function displayTradeHandler() {
    // Display Modal to view trade details
    setDisplayTrade(true);
  }

  function displayTradeHideHandler() {
    // Hide Modal on cancel
    setDisplayTrade(false);
  }

  function closeTradeHandler() {
    // Close trade (not an adjustment)
    <NewTradeForm></NewTradeForm>

    // Patch Request
    fetch("https://tether-89676-default-rtdb.firebaseio.com/trades/-MbaTBmnW-spbRACw_Jy.json", {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        closedTrade: true,
      }),
    })
      .then((response) => {
        console.log(response.status);
        return response.json();
      })
      .then((data) => console.log(data));

    // Hide Modal after closing a trade
    displayTradeHideHandler();
  }

  const ModalContent = () => {
    return (
      <Modal show={displayTrade} onHide={displayTradeHideHandler}>
        <Modal.Header closeButton>
          <Modal.Title>{modalInfo.ticker}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Number of Contracts: {modalInfo.numContracts}</div>
          <div>Days till Expiration: {modalInfo.dte}</div>
          <div>Days in Trade: {modalInfo.dit}</div>
          <div>Open Price: {modalInfo.openPrice}</div>
          <div>Notes: {modalInfo.notes}</div>
          <div>Closed?: {modalInfo.closedTrade}</div>
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
            onClick={displayTradeHideHandler}
            name="Adjust Position"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          ></Button>
          <Button
            type="button"
            onClick={displayTradeHideHandler}
            name="Cancel"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          ></Button>
        </Modal.Footer>
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
      {displayTrade ? <ModalContent /> : null}
    </div>
  );
}

export default TradeList;
