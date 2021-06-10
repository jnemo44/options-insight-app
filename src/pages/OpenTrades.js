import NewTradeForm from "../components/NewTrade/NewTradeForm";
import { useHistory } from "react-router-dom";
import { supabase } from "../supabaseClient";

//import Modal from "../components/UI/Modal";
import { Modal } from "react-bootstrap";
import Button from "../components/UI/Button";
import { PlusIcon as PlusIconOutline } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import TradeList from "../components/Trade/TradeList";

function OpenTradesPage() {
  const [displayModal, setDisplayModal] = useState(false);
  const [newTradeAdded, setNewTradeAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedTrades, setLoadedTrades] = useState([]);

  const modalAction = {
    buttonTitle: "Submit",
    buttonType: "submit",
  };

  useEffect(() => {
    //var one_day = 1000 * 60 * 60 * 24;
    //var currentDate = new Date();

    getOpenTrades();

    // for (const key in data) {
    //   const trade = {
    //     id: key,
    //     ...data[key],
    //   };
    //   const convertedDte = new Date(trade.expirationDate);
    //   var dte = Math.round(
    //     Math.abs(convertedDte.getTime() - currentDate.getTime()) / one_day
    //   ).toFixed(0);
    //   const convertedDit = new Date(trade.openDate);
    //   var dit = Math.round(
    //     Math.abs(currentDate.getTime() - convertedDit.getTime()) / one_day
    //   ).toFixed(0);
    //   // Subtract 1 so that DTE is 0 on the day it is set to expire
    //   trade.dte = dte - 1;
    //   trade.dit = dit;
    //   trades.push(trade);
    // }

    //});
  }, [newTradeAdded]);

  if (isLoading) {
    return (
      <section>
        <h1>Loading...</h1>
      </section>
    );
  }

  async function getOpenTrades() {
    try {
      setIsLoading(true);
      let { data: OpenTrades, error } = await supabase
        .from("OpenTrades")
        .select("*");

      console.log(error)

      setLoadedTrades(OpenTrades);

    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
      setNewTradeAdded(false);
    }
  }

  function newTradeHandler() {
    // Display Modal for New Trade entry
    setDisplayModal(true);
  }

  function newTradeFormHideHandler() {
    // Hide Modal on cancel or
    setDisplayModal(false);
  }

  async function addTradeHandler(newTradeData) {
    // Post Trade to backend
    const { data, error } = await supabase
      .from("OpenTrades")
      .upsert(newTradeData);

    console.log(data, error);

    // Close Modal after form submission
    newTradeFormHideHandler();
    setNewTradeAdded(true);
  }

  const ModalContent = () => {
    return (
      <Modal show={displayModal} onHide={newTradeFormHideHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Enter New Trade Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewTradeForm
            onAddTrade={addTradeHandler}
            onCancel={newTradeFormHideHandler}
          ></NewTradeForm>
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
      <Button
        type="button"
        onClick={newTradeHandler}
        className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <PlusIconOutline className="h-6 w-6" aria-hidden="true" />
      </Button>
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            We've used 3xl here, but feel free to try other max-widths based on your needs
        <div className="max-w-7xl mx-auto"><TradeList trades={loadedTrades}></TradeList></div> 
        </div>*/}

      <TradeList trades={loadedTrades}></TradeList>
    </div>
  );
}

export default OpenTradesPage;
