import { useState } from "react";
//import BootStrapTable from "react-bootstrap-table-next";
import TradeListTable from "./TradeListTable";
import Dropdown from "../UI/Dropdown";
import { Modal } from "react-bootstrap";
import Button from "../UI/Buttons";
import AdjustTradeList from "../AdjustTrade/AdjustTradeList";

//import Modal from "../UI/Modal";

function ClosedTradeList(props) {
  const [displayTradeInfo, setDisplayTradeInfo] = useState(false);
  const [tradeInfoModal, setTradeInfoModal] = useState([]);

  console.log(props.trades)

  function onRowSelectHandler(trade, event) {
    console.log(trade.original)
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

  function deleteTradeHandler() {
    // Delete Request
    const url = "http://127.0.0.1:5000/close-orders?adjustmentID=" + tradeInfoModal.adjustmentID + "&id=" + tradeInfoModal.id
    fetch(url, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        hideTradeInfoHandler();
      });

    // Trigger Page Reload
    props.modified();
  }

  const TradeInfoModal = () => {
    return (
      <Modal show={displayTradeInfo} onHide={hideTradeInfoHandler}>
        <Modal.Header closeButton>
          <Modal.Title>{tradeInfoModal.ticker}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Number of Contracts: {tradeInfoModal.numContracts}</div>
          <div>Days in Trade: {tradeInfoModal.dit}</div>
          <div>Close Price: {tradeInfoModal.closePrice}</div>
          <div>Notes: {tradeInfoModal.closeNotes}</div>
          <AdjustTradeList trades={tradeInfoModal}></AdjustTradeList>
        </Modal.Body>
        <Modal.Footer>
          <Dropdown
            //edit={editTradeHandler}
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

  return (
    <div>
      <TradeListTable 
        onRowSelect={onRowSelectHandler}
        columns={props.columns} 
        data={props.trades}>
      </TradeListTable>
      {displayTradeInfo ? <TradeInfoModal />: null}
    </div>
  );
}

export default ClosedTradeList;