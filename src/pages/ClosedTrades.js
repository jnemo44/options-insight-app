import { useState, useEffect } from 'react';
import ClosedTradeList from '../components/Trade/ClosedTradeList';

function ClosedTradesPage() {
    //const [displayModal, setDisplayModal] = useState(false);
    //const [newTradeAdded, setNewTradeAdded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadedTrades, setLoadedTrades] = useState([]);
    const [totalPL, setTotalPL] = useState();

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
                var totalProfitLoss = 0;
                console.log("TEST", convertedData);
                for (const key in convertedData) {
                    const trade = {
                        id: key,
                        ...convertedData[key],
                        dit: (new Date(convertedData[key].openDate) - new Date(convertedData[key].closeDate)),
                        profitLoss: (parseFloat(convertedData[key].openPrice) - parseFloat(convertedData[key].closePrice)).toFixed(2),
                    };
                    totalProfitLoss+=parseFloat(trade.profitLoss);
                    trades.push(trade);
                    setTotalPL(totalProfitLoss);
                }
                setLoadedTrades(trades);
                console.log("Trades", trades);
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

    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
          Total P/L: {totalPL}
        {/* Content goes here */}
        {/* We use less vertical padding on card headers on desktop than on body sections */}
      </div>
      <div className="bg-gray-50 px-4 py-5 sm:p-6"><ClosedTradeList trades={loadedTrades}></ClosedTradeList></div>
    </div>
        
    )
}

export default ClosedTradesPage;