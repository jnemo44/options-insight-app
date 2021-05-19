import Modal from "../components/UI/Modal";
import NewTradeForm from "../components/NewTrade/NewTradeForm";
import { useHistory } from "react-router-dom";

import { PlusIcon as PlusIconOutline } from '@heroicons/react/outline'
import { useState, useEffect } from "react";
import TradeList from "../components/Trade/TradeList";


function OpenTradesPage() {
    const [displayModal, setDisplayModal] = useState(false);
    const [newTradeAdded, setNewTradeAdded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedTrades, setLoadedTrades] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch("https://tether-89676-default-rtdb.firebaseio.com/trades.json")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const trades = [];

            for (const key in data) {
                const trade = {
                    id: key,
                    ...data[key]
                };
                trades.push(trade);
            };
            setLoadedTrades(trades);
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

    return (
        <div>
        {displayModal && <Modal onHide={newTradeFormHideHandler}>
            <NewTradeForm onAddTrade={addTradeHandler}></NewTradeForm>     
        </Modal>}
        <section>
            <h1>Open Trades Page</h1>
            <div>
                <TradeList trades={loadedTrades}></TradeList>
            </div>
            <button 
                type="button" 
                onClick={newTradeHandler}
                className="inline-flex items-center p-3 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <PlusIconOutline className="h-6 w-6" aria-hidden="true" />
        </button>
        </section>
        </div>
    )
}

export default OpenTradesPage;