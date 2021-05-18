import Modal from "../components/UI/Modal";
import NewTradeForm from "../components/NewTrade/NewTradeForm";
import { useHistory } from "react-router-dom";

import { PlusIcon as PlusIconOutline } from '@heroicons/react/outline'
import { useState } from "react";
import TradeList from "../components/Trade/TradeList";

const DUMMY_DATA = [
    {
      id: "m1",
      ticker: "APPL",
      numContracts: "1",
      openPrice: "2.34"
    },
    {
        id: "m2",
        ticker: "XYZ",
        numContracts: "3",
        openPrice: "2.34"
    },
    {
        id: "m3",
        ticker: "QQQ",
        numContracts: "2",
        openPrice: "1.13"
    },
  ];


function OpenTradesPage() {
    const history = useHistory();
    const [displayModal, setDisplayModal] = useState(false)

    function newTradeHandler() {
        // Turn on Modal
        setDisplayModal(true);
    }

    function newTradeFormHideHandler () {
        setDisplayModal(false);
    }

    function addTradeHandler(newTradeData) {
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
            //history.replaceState('/')
          })
    }

    return (
        <div>
        {displayModal && <Modal onHide={newTradeFormHideHandler}>
            <NewTradeForm onAddTrade={addTradeHandler}></NewTradeForm>     
        </Modal>}
        <section>
            <h1>Open Trades Page</h1>
            <div>
                <TradeList trades={DUMMY_DATA}></TradeList>
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