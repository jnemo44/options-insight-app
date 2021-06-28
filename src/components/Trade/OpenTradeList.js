import { useState } from "react";
import BootStrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Modal } from "react-bootstrap";
import Button from "../UI/Button";
import CloseTradeForm from "../CloseTrade/CloseTradeForm";
import AdjustTradeForm from "../AdjustTrade/AdjustTradeForm";
import FormDisplayed from "../Trade/FormDisplayed";

function OpenTradeList(props) {
  const [displayTradeInfo, setDisplayTradeInfo] = useState(false);
  const [tradeInfoModal, setTradeInfoModal] = useState([]);
  const [displayCloseTradeForm, setDisplayCloseTradeForm] = useState(false);
  const [displayAdjustTradeForm, setDisplayAdjustTradeForm] = useState(false);
  const [formDisplayed, setFormDisplayed] = useState();
  

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

  // function FormDisplayed(props) {
  //   console.log ('Do I get here??')
  //   const form = props.form
  //   console.log(form)
  //   if (form == "close") {
  //     return <CloseTradeModal tradeInfo={tradeInfoModal}/> 
  //   }
  //   else if (form == "adjust") {
  //     return <AdjustTradeModal tradeInfo={tradeInfoModal}/>
  //   }
  //   else {
  //     console.log(formDisplayed)
  //     return <TradeInfoModal />
  //   }
  // }

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

    // Patch Request (Set closed flag in open order table) 
    const url = "http://127.0.0.1:5000/open-orders/"+ closeTradeData.openID
    console.log(url);
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
      props.closed();
  }

  const TradeInfoModal = () => {
    return (
      <Modal show={displayTradeInfo} onHide={hideTradeInfoHandler}>
        <Modal.Header closeButton>
          <Modal.Title>{tradeInfoModal.ticker}</Modal.Title>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
            OPEN
          </span>
          <Button
            type="button"
            name="Delete Trade"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"></Button>
        </Modal.Header>
        <Modal.Body>
          <div>Number of Contracts: {tradeInfoModal.numContracts}</div>
          <div>Days till Expiration: {tradeInfoModal.dte}
               Expires: {tradeInfoModal.expirationDate}      
          </div>
          <div>Days in Trade: {tradeInfoModal.dit}
               Opened: {tradeInfoModal.openDate}  
          </div>
          <div>Open Price: {tradeInfoModal.openPrice}</div>
          <div>Notes: {tradeInfoModal.openNotes}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            onClick={setFormDisplayed('close')}
            name="Close Position"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          ></Button>
          <Button
            type="button"
            onClick={setFormDisplayed('adjust')}
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
      <Modal show={true} onHide={hideCloseTradeFormHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Closing Trade Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CloseTradeForm 
            tradeInfo={props.tradeInfo} 
            onCancel={setFormDisplayed('none')}
            onCloseTrade={submitCloseTradeHandler}></CloseTradeForm>
        </Modal.Body>
      </Modal>
    );
  };

  const AdjustTradeModal = (props) => {
    return (
      <Modal show={true} onHide={setFormDisplayed('none')}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Adjustment Trade Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AdjustTradeForm 
            tradeInfo={props.tradeInfo} 
            onCancel={setFormDisplayed('none')}
            onCloseTrade={console.log('ADJUST!')}>
          </AdjustTradeForm>
        </Modal.Body>
      </Modal>
    );
  };



  return (
    <div>
      <BootStrapTable
        keyField="ticker"
        data={props.trades}
        caption="Trade List"
        columns={columns}
        pagination={paginationFactory()}
        rowEvents={rowEvents}
        hover
        striped
      />
      {/* <FormDisplayed form={formDisplayed}/> */}
      {formDisplayed === 'close' ? <CloseTradeModal tradeInfo={tradeInfoModal}/> : 
       formDisplayed === 'adjust' ? <AdjustTradeModal tradeInfo={tradeInfoModal}/> : <TradeInfoModal />}
      {/* {displayCloseTradeForm ? <CloseTradeModal tradeInfo={tradeInfoModal}/> : <TradeInfoModal />}  */}
    </div>
  );
}

export default OpenTradeList;
