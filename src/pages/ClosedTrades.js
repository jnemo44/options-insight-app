import { useState, useEffect } from 'react';
import ClosedTradeList from '../components/Trade/ClosedTradeList';

function ClosedTradesPage() {
    //const [displayModal, setDisplayModal] = useState(false);
    //const [newTradeAdded, setNewTradeAdded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadedTrades, setLoadedTrades] = useState([]);

    useEffect(() => {
        var one_day = 1000 * 60 * 60 * 24;
        var currentDate = new Date();

        //setIsLoading(true);
        fetch("http://127.0.0.1:5000/close-orders", {
            method: "GET",
            headers: { "Content-type": "application/json" },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const trades = [];
                const convertedData = { ...data.close_list };
                console.log("TEST", convertedData);
                for (const key in convertedData) {
                    console.log("Key", key);
                    const trade = {
                        id: key,
                        ...convertedData[key],
                    };
                    trades.push(trade);
                }
                setLoadedTrades(trades);
                //setIsLoading(false);
                //setNewTradeAdded(false);
            });
    }, []);

    if (isLoading) {
        return (
            <section>
                <h1>Loading...</h1>
            </section>
        );
    }
    return (
        <div>
            <ClosedTradeList trades={loadedTrades}></ClosedTradeList>
        </div>
    )
}

export default ClosedTradesPage;