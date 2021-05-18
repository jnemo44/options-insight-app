import Modal from "../components/UI/Modal";
import NewTradeForm from "../components/NewTrade/NewTradeForm";

import { PlusIcon as PlusIconOutline } from '@heroicons/react/outline'
import { useState } from "react";


function OpenTradesPage() {
    const [displayModal, setDisplayModal] = useState(false)

    function newTradeHandler() {
        // Turn on Modal
        setDisplayModal(true);
    }

    function newTradeFormHideHandler () {
        setDisplayModal(false);
    }


    return (
        <div>
        {displayModal && <Modal onHide={newTradeFormHideHandler}>
            <NewTradeForm></NewTradeForm>     
        </Modal>}
        <section>
            <div>Open Trades Page</div>
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