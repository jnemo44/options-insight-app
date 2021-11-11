import OpenTradeForm from "../components/OpenTrade/OpenTradeForm";
import {convertDate} from "../components/UI/Utils";

//import Modal from "../components/UI/Modal";
import { Modal } from "react-bootstrap";
import Button from "../components/UI/Buttons";
import { PlusIcon as PlusIconOutline } from "@heroicons/react/outline";
import { React, useState, useEffect } from "react";
import OpenTradeList from "../components/Trade/OpenTradeList";
import Emoji from "../components/UI/Emoji";


function OpenTradesPage(props) {
  const [displayModal, setDisplayModal] = useState(false);
  const [tradeListModified, setTradeListModified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedTrades, setLoadedTrades] = useState([]);

  useEffect(() => {
    var one_day = 1000 * 60 * 60 * 24;
    var currentDate = new Date();

    //https://tether-89676-default-rtdb.firebaseio.com/trades.json
    //"http://127.0.0.1:5000/open-orders"
    console.log("Trade List Modified Triggered")

    setIsLoading(true);
    fetch("http://127.0.0.1:5000/open-orders", {
      method: "GET",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const trades = [];
        const openList = { ...data.open_list};
        // console.log("openList")
        // console.log(openList)
        const tradeHistory = data.trade_history;
        const adjustedTradeID = {...data.adjusted_trade_IDs[1]};
        // console.log("tradeHistory")
        // console.log(tradeHistory)
        // console.log("adjustedTradeID")
        // console.log(adjustedTradeID)

        for (const key in openList) {
          // Eliminate TZ offset and just use the date
          let currentTradeHistory = []
          let openDate = convertDate(openList[key].openDate)
          let expirationDate = convertDate(openList[key].expirationDate)
          let numContracts = openList[key].numContracts
          // If something in the Open List has an adjustment ID get ALL trades with that ID from tradeHistory
          if (Object.values(adjustedTradeID).indexOf(openList[key].adjustmentID) > -1) {
              for(const index in tradeHistory) {
                for (const adjustment in tradeHistory[index])
                  if (tradeHistory[index][0].adjustmentID === openList[key].adjustmentID) {
                    currentTradeHistory.push(tradeHistory[index][adjustment])
                }
              }
          }

          const trade = {
            id: key,
            ...openList[key],
            numContracts: numContracts <0 ? numContracts : "+" + numContracts,
            openPrice: "$"+ openList[key].openPrice,
            expirationDate: expirationDate.toDateString(),
            openDate: openDate.toDateString(),
            dte: Math.ceil((Math.abs(expirationDate.getTime() - currentDate.getTime()) / one_day)),
            dit: Math.ceil((Math.abs(currentDate.getTime() - openDate.getTime()) / one_day)),
            tradeHistory: currentTradeHistory,
          };
          // Subtract 1 so that DTE is 0 on the day it is set to expire
          trade.dte -= 1;
          // Subtract 1 so that day 0 is the day you enter
          trade.dit -= 1;
          trades.push(trade);
          console.log(trade)
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
    // A new trade has been added, closed, or adjusted
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
      tradeListModifiedHandler();
    });
    // Close Modal after form submission
    newTradeFormHideHandler();
  }

  const ModalContent = () => {
    return (
      <Modal show={displayModal} onHide={newTradeFormHideHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Trade <Emoji symbol='💸' /></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OpenTradeForm
            onAddTrade={addTradeHandler}
            onCancel={newTradeFormHideHandler}
          ></OpenTradeForm>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* This is where you can change the table width */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* <div className="">
          <h1 className="text-xl font-semibold">Open Trades</h1>
        </div> */}
        <div className="mt-4">
          {displayModal ? <ModalContent /> : null}
          <div className='py-3'>
            <Button
              type="button"
              onClick={newTradeHandler}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
              <PlusIconOutline className="h-6 w-6" aria-hidden="true" />
              Add New Trade
            </Button>
          </div>
          <OpenTradeList columns={props.columns} trades={loadedTrades} modified={tradeListModifiedHandler}></OpenTradeList>
        </div>
      </main>
    </div>
  );
}

export default OpenTradesPage;
