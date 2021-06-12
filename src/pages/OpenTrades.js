import NewTradeForm from "../components/NewTrade/NewTradeForm";
import { useHistory } from "react-router-dom";


//import Modal from "../components/UI/Modal";
import { Modal } from "react-bootstrap";
import Button from '../components/UI/Button';
import { PlusIcon as PlusIconOutline } from '@heroicons/react/outline'
import { useState, useEffect } from "react";
import TradeList from "../components/Trade/TradeList";

//"https://tether-89676-default-rtdb.firebaseio.com/trades.json"

function OpenTradesPage() {
    const [displayModal, setDisplayModal] = useState(false);
    const [newTradeAdded, setNewTradeAdded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedTrades, setLoadedTrades] = useState([]);

    const modalAction = {
        buttonTitle:"Submit",
        buttonType:"submit"
    }

    useEffect(() => {
        var one_day = 1000 * 60 * 60 * 24;
        var currentDate = new Date();

        //https://tether-89676-default-rtdb.firebaseio.com/trades
        //"http://127.0.0.1:5000/open-orders"

        setIsLoading(true);
        fetch('http://127.0.0.1:5000/open-orders', {
          method: "GET",
          headers: { "Content-type": "application/json" },
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log('Data.open_list',data.open_list);
            const trades = [];

            const convertedData = {...data.open_list};
            console.log('TEST',convertedData);

            for (const key in convertedData) {
                console.log('Key',key)
                const trade = {
                    id: key,
                    ...convertedData[key],
                };
                console.log('trade',trade)
                const convertedDte = new Date(trade.expirationDate)
                var dte = (Math.round(Math.abs(convertedDte.getTime() - currentDate.getTime()) / (one_day))).toFixed(0);
                const convertedDit = new Date(trade.openDate)
                var dit = (Math.round(Math.abs(currentDate.getTime() - convertedDit.getTime()) / (one_day))).toFixed(0);
                // Subtract 1 so that DTE is 0 on the day it is set to expire
                trade.dte = dte-1;
                trade.dit = dit;
                trades.push(trade);
            };
            setLoadedTrades(trades);
            console.log("Trades Pushed",trades);
            setIsLoading(false);
            setNewTradeAdded(false);
        })
    }, [newTradeAdded]);

    if (isLoading) {
        return (
            <section>
                <h1>Loading...</h1>
            </section>
        )
    }

    function newTradeHandler() {
        // Display Modal for New Trade entry
        setDisplayModal(true);
    }

    function newTradeFormHideHandler () {
        // Hide Modal on cancel or 
        setDisplayModal(false);
    }

    function addTradeHandler(newTradeData) {
        // Post Trade to backend
        fetch(
            "https://tether-89676-default-rtdb.firebaseio.com/trades.json",
            {
              method: 'POST',
              body: JSON.stringify(newTradeData),
              headers: {
                'Content-Type': 'application/json'
              }
            }
          ).then(() => {
            //
          })

        // Close Modal after form submission
        newTradeFormHideHandler();
        setNewTradeAdded(true);
    }

    const ModalContent = () => {
        return (
          <Modal show={displayModal} onHide={newTradeFormHideHandler}>
            <Modal.Header closeButton>
              <Modal.Title>New Trade Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <NewTradeForm onAddTrade={addTradeHandler} onCancel={newTradeFormHideHandler}></NewTradeForm>
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
        {displayModal ? <ModalContent/> : null}
        <Button
            type='button'
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
    )
}

export default OpenTradesPage;