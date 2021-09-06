import { useState, useEffect } from 'react';
import ClosedTradeList from '../components/Trade/ClosedTradeList';

function ClosedTradesPage() {
    //const [displayModal, setDisplayModal] = useState(false);
    //const [newTradeAdded, setNewTradeAdded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadedTrades, setLoadedTrades] = useState([]);
    const [totalPL, setTotalPL] = useState();

    useEffect(() => {
        setIsLoading(true);
        fetch("http://127.0.0.1:5000/close-orders", {
            method: "GET",
            headers: { "Content-type": "application/json" },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const trades = [];
                const nonAdjustedTrades = { ...data.non_adjusted_list };
                const adjustedTrades = {...data.adjusted_list};
                const adjustmentInfo = {...data.adjustment_info};
                console.log(adjustmentInfo)
                var totalProfitLoss = 0;

                for (const key in nonAdjustedTrades) {
                    const trade = {
                        ...nonAdjustedTrades[key],
                        dit: (new Date(nonAdjustedTrades[key].openDate) - new Date(nonAdjustedTrades[key].closeDate)),
                        profitLoss: (parseFloat(nonAdjustedTrades[key].openPrice) - parseFloat(nonAdjustedTrades[key].closePrice)).toFixed(2),
                    };
                    totalProfitLoss+=parseFloat(trade.profitLoss);
                    trades.push(trade);
                    setTotalPL(totalProfitLoss);
                }

                for (const adjust_idx in adjustedTrades) {
                    let adjustmentPL = 0;
                    let totalDIT = 0;
                    for (const trade_idx in adjustedTrades[adjust_idx]) {
                        var openTime = new Date(adjustedTrades[adjust_idx][trade_idx].openDate);
                        //openTime = openTime.split(' ').slice(0, 4).join(' ');
                        
                        var closeTime = new Date(adjustedTrades[adjust_idx][trade_idx].closeDate);
                        //closeTime = closeTime.split(' ').slice(0, 4).join(' ');
                        adjustmentPL += (parseFloat(adjustedTrades[adjust_idx][trade_idx].openPrice) - parseFloat(adjustedTrades[adjust_idx][trade_idx].closePrice))
                        totalDIT += Math.ceil((Math.abs(closeTime-openTime) / (1000 * 60 * 60 * 24)))   
                    }
                    
                    const trade = {
                        // Trade stats for main table
                        ticker:adjustedTrades[adjust_idx][0].ticker,
                        numContracts:adjustedTrades[adjust_idx][0].numContracts,
                        profitLoss: adjustmentPL.toFixed(2),
                        dit: totalDIT,
                        // Pass all trade info
                        ...adjustedTrades[adjust_idx]
                    }
                    trades.push(trade);
                }

                setLoadedTrades(trades);
                setIsLoading(false);
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