import { useState } from "react";
import BootStrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Modal } from "react-bootstrap";
import Button from "../UI/Button";
import AdjustTradeList from "../AdjustTrade/AdjustTradeList";

//import Modal from "../UI/Modal";

function ClosedTradeList(props) {
  const [displayTradeInfo, setDisplayTradeInfo] = useState(false);
  const [tradeInfoModal, setTradeInfoModal] = useState([]);

  // Column Data Field has to match data name from backend!
  const columns = [
    { dataField: "ticker", text: "Ticker" },
    { dataField: "spread", text: "Spread" },
    { dataField: "dit", text: "DIT" },
    { dataField: "numContracts", text: "Number of Contracts" },
    { dataField: "openPrice", text: "Open Price" },
    { dataField: "closePrice", text: "Close Price" },
    { dataField: "profitLoss", text: "P/L" },
  ];

  const rowEvents = {
    onClick: (e, row) => {
      setTradeInfoModal(row);
      displayTradeInfoHandler();
      console.log(Object.values(tradeInfoModal));
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

  const TradeInfoModal = () => {
    return (
      <Modal show={displayTradeInfo} onHide={hideTradeInfoHandler}>
        <Modal.Header closeButton>
          <Modal.Title>{tradeInfoModal.ticker}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AdjustTradeList trades={tradeInfoModal}></AdjustTradeList>
          <div>Number of Contracts: {tradeInfoModal.numContracts}</div>
          <div>Days in Trade: {tradeInfoModal.dit}</div>
          <div>Close Price: {tradeInfoModal.closePrice}</div>
          <div>Notes: {tradeInfoModal.closeNotes}</div>
          
        </Modal.Body>
        <Modal.Footer>
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

  return (
    <div>
      <BootStrapTable
        keyField="name"
        caption="Closed Trade List"
        classes="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        data={props.trades}
        noDataIndication="You havn't closed any trades yet!"
        columns={columns}
        pagination={paginationFactory()}
        rowEvents={rowEvents}
        hover
        striped
      />
      {displayTradeInfo ? <TradeInfoModal />: null}
    </div>
  );
}

export default ClosedTradeList;