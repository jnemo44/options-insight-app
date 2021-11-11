import { useState, useEffect } from 'react';
import ClosedTradeList from '../components/Trade/ClosedTradeList';
import BootStrapTable from "react-bootstrap-table-next";
import BootstrapTable from 'react-bootstrap-table-next';

function ClosedTradesPage(props) {
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
                console.log("nonAdjustedTrades")
                console.log(nonAdjustedTrades)
                const adjustedTrades = { ...data.closed_adjusted_list };
                console.log("adjustedTrades")
                console.log(adjustedTrades)
                const adjustmentInfo = { ...data.adjustment_info };

                var totalProfitLoss = 0;

                // This is a trade that had no adjustments
                for (const key in nonAdjustedTrades) {
                    const trade = {
                        ...nonAdjustedTrades[key],
                        dit: (new Date(nonAdjustedTrades[key].openDate) - new Date(nonAdjustedTrades[key].closeDate)),
                        profitLoss: (parseFloat(nonAdjustedTrades[key].openPrice) - parseFloat(nonAdjustedTrades[key].closePrice)).toFixed(2),
                    };
                    totalProfitLoss += parseFloat(trade.profitLoss);
                    trades.push(trade);
                    setTotalPL(totalProfitLoss);
                }

                // This is any trade that had adjustments
                Object.keys(adjustedTrades).map((key, index) => {
                    var adjustmentPL = 0;
                    var totalDIT = 0;
                    adjustedTrades[key].map((trade, index) => {
                        var openTime = new Date(adjustedTrades[key][index].openDate);
                        var closeTime = new Date(adjustedTrades[key][index].closeDate);
                        adjustmentPL += (parseFloat(adjustedTrades[key][index].openPrice) - parseFloat(adjustedTrades[key][index].closePrice))
                        totalDIT += Math.ceil((Math.abs(closeTime - openTime) / (1000 * 60 * 60 * 24)))
                    })

                    const trade = {
                        // Trade stats for main table
                        ticker: adjustedTrades[key][0].ticker,
                        numContracts: adjustedTrades[key][0].numContracts,
                        spread: adjustedTrades[key][0].spread,
                        profitLoss: adjustmentPL.toFixed(2),
                        dit: totalDIT,
                        // Pass all trade info
                        ...adjustedTrades[key]
                    }
                    console.log('trade')
                    console.log(trade)
                    trades.push(trade);
                })
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
        <div className="min-h-screen bg-gray-100 text-gray-900">
            {/* This is where you can change the table width */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <div className="px-4 py-5 sm:px-6">
                    <h1>Total P/L: {totalPL}</h1>
                </div>
                <div>
                    <ClosedTradeList columns={props.columns} trades={loadedTrades}></ClosedTradeList>
                </div>
            </main>
        </div>

    )
}

export default ClosedTradesPage;