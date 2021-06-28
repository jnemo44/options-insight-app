import OpenTradeForm from "../components/OpenTrade/OpenTradeForm";

//import Modal from "../components/UI/Modal";
import { Modal } from "react-bootstrap";
import Button from "../components/UI/Button";
import { PlusIcon as PlusIconOutline } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import OpenTradeList from "../components/Trade/OpenTradeList";

function OpenTradesPage() {
  const [displayModal, setDisplayModal] = useState(false);
  const [tradeListModified, setTradeListModified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedTrades, setLoadedTrades] = useState([]);

  useEffect(() => {
    var one_day = 1000 * 60 * 60 * 24;
    var currentDate = new Date();

    //https://tether-89676-default-rtdb.firebaseio.com/trades.json
    //"http://127.0.0.1:5000/open-orders"

    setIsLoading(true);
    fetch("http://127.0.0.1:5000/open-orders", {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Data.open_list", data.open_list);
        const trades = [];

        const convertedData = { ...data.open_list };

        for (const key in convertedData) {
          const trade = {
            id: key,
            ...convertedData[key],
            dte: Math.round(
              Math.abs(new Date(convertedData[key].expirationDate).getTime() - currentDate.getTime()) / one_day
            ).toFixed(0),
            dit: Math.round(
              Math.abs(currentDate.getTime() - new Date(convertedData[key].openDate).getTime()) / one_day
            ).toFixed(0),
          };
          // Subtract 1 so that DTE is 0 on the day it is set to expire
          trade.dte -= 1;
          // Subtract 1 so that day 0 is the day you enter
          trade.dit -= 1;
          trades.push(trade);
        }
        setLoadedTrades(trades);
        setIsLoading(false);
        setTradeListModified(false);
      });
  }, [tradeListModified]);

  if (isLoading) {
    return (
      <section>
        <h1>Loading...</h1>
      </section>
    );
  }

  function newTradeHandler() {
    // Display Modal for New Trade entry
    setDisplayModal(true);
  }

  function newTradeFormHideHandler() {
    // Hide Modal on cancel or
    setDisplayModal(false);
  }

  function tradeListModifiedHandler() {
    // A new trade has been added or closed
    setTradeListModified(true);
  }

  function addTradeHandler(openTradeData) {
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
      // Trigger useEffect
      setTradeListModified(true);
    });

    // Close Modal after form submission
    newTradeFormHideHandler();
  }

  const ModalContent = () => {
    return (
      <Modal show={displayModal} onHide={newTradeFormHideHandler}>
        <Modal.Header closeButton>
          <Modal.Title>New Trade Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OpenTradeForm
            onAddTrade={addTradeHandler}
            onCancel={newTradeFormHideHandler}
          ></OpenTradeForm>
        </Modal.Body>
        {/* <Modal.Footer>
            <Button
              id='new-trade'
              type="submit"
              onClick={newTradeFormHideHandler}
              name="Submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            ></Button>
            <Button
              type="button"
              onClick={newTradeFormHideHandler}
              name="Cancel"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            ></Button>
          </Modal.Footer> */}
      </Modal>
    );
  };

  return (
    <div>
      {/* {displayModal && <Modal onHide={newTradeFormHideHandler} modalAction={modalAction}>
          <NewTradeForm onAddTrade={addTradeHandler}></NewTradeForm>     
      </Modal>} */}
      {displayModal ? <ModalContent /> : null}
      <div className='py-3'>
        <Button
          type="button"
          onClick={newTradeHandler}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIconOutline className="h-6 w-6" aria-hidden="true" />
        Add New Trade
      </Button>
      </div>

      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          We've used 3xl here, but feel free to try other max-widths based on your needs
      <div className="max-w-7xl mx-auto"><TradeList trades={loadedTrades}></TradeList></div> 
      </div>*/}

      <OpenTradeList trades={loadedTrades} closed={tradeListModifiedHandler}></OpenTradeList>
    </div>
  );
}

export default OpenTradesPage;
