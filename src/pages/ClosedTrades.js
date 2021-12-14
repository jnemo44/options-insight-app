import { useState, useEffect } from 'react';
import ClosedTradeList from '../components/Trade/ClosedTradeList';

function ClosedTradesPage(props) {
    //const [displayModal, setDisplayModal] = useState(false);
    const [tradeListModified, setTradeListModified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loadedTrades, setLoadedTrades] = useState([]);
    const [totalPL, setTotalPL] = useState(0);
    const [numTrades, setNumTrades] = useState(0);

    function tradeListModifiedHandler() {
        // A new trade has been added, closed, or adjusted
        setTradeListModified(true);
    }

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
                console.log("nonAdjustedTrades")
                console.log(nonAdjustedTrades)
                const adjustedTrades = { ...data.closed_adjusted_list };
                console.log("adjustedTrades")
                console.log(adjustedTrades)
                const adjustmentInfo = { ...data.adjustment_info };

                var totalProfitLoss = 0;
                var totalNumTrades = 0;
                var premiumCaptureRate = 0;

                // This is a trade that had no adjustments
                for (const key in nonAdjustedTrades) {
                    let priceDelta = (parseFloat(nonAdjustedTrades[key].openPrice) - parseFloat(nonAdjustedTrades[key].closePrice))
                    
                    const trade = {
                        ...nonAdjustedTrades[key],
                        dit: (new Date(nonAdjustedTrades[key].openDate) - new Date(nonAdjustedTrades[key].closeDate)),
                        profitLoss: priceDelta,
                    };
                    totalProfitLoss += trade.profitLoss;
                    premiumCaptureRate = (priceDelta/parseFloat(nonAdjustedTrades[key].openPrice))
                    
                    console.log(priceDelta)
                    console.log("premiumCaptureRate")
                    console.log(premiumCaptureRate)
                    totalNumTrades+=1;
                    trades.push(trade);
                }

                // This is any trade that had adjustments
                Object.keys(adjustedTrades).map((key) => {
                    let totalDIT = 0;
                    adjustedTrades[key].map((trade) => {
                        let openTime = new Date(trade.openDate);
                        let closeTime = new Date(trade.closeDate);
                        totalProfitLoss += ((trade.openPrice - trade.closePrice));
                        totalDIT += Math.ceil((Math.abs(closeTime - openTime) / (1000 * 60 * 60 * 24)));
                        //console.log(totalProfitLoss)
                    })

                    // Only increment once per trade (do not count adjustments)
                    totalNumTrades+=1;
                    
                    const trade = {
                        // Trade stats for main table
                        ticker: adjustedTrades[key][0].ticker,
                        adjustmentID: adjustedTrades[key][0].adjustmentID,
                        numContracts: adjustedTrades[key][0].numContracts,
                        spread: adjustedTrades[key][0].spread,
                        profitLoss: totalProfitLoss.toFixed(2),
                        dit: totalDIT,
                        // Pass all trade info
                        ...adjustedTrades[key]
                    }
                    console.log('trade')
                    console.log(trade)
                    trades.push(trade);
                })
                // Set Stat States
                setTotalPL(totalProfitLoss.toFixed(2))
                setNumTrades(totalNumTrades)
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
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            {/* This is where you can change the table width */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <div className="px-4 py-5 sm:px-6">
                    <h1>Total P/L: {totalPL}</h1>
                    <h1>Total Number of Trades: {numTrades}</h1>
                </div>
                <div>
                    <ClosedTradeList columns={props.columns} trades={loadedTrades} modified={tradeListModifiedHandler}></ClosedTradeList>
                </div>
            </main>
        </div>

    )
}

export default ClosedTradesPage;