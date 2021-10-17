import {useMemo} from 'react';
import  { Route, Switch} from 'react-router-dom';

import Layout from "./components/Layout/Layout";
import OpenTradesPage from "./pages/OpenTrades";
import ClosedTradesPage from "./pages/ClosedTrades";
import TradeStatsPage from "./pages/TradeStats";
import {SelectColumnFilter} from "./components/Trade/Table";

function App () {
    const columns = useMemo(() => [
        {
          Header: "Ticker",
          accessor: "ticker",
        },
        {
          Header: "Open Date",
          accessor: "openDate",
          Filter: SelectColumnFilter,
          filter: 'includes',
        },
        {
          Header: "Spread",
          accessor: "spread",
        },
        {
          Header: "DTE",
          accessor: "dte",
        },
        {
          Header: "Contract",
          accessor: "numContracts",
        },
        {
          Header: "Open Price",
          accessor: "openPrice",
        },
        
      ], [])    

    return (
        <Layout>
            <Switch>
                <Route path="/" exact={true}>
                    <OpenTradesPage columns={columns}></OpenTradesPage>
                </Route>
                <Route path='/closed-trades'>
                    <ClosedTradesPage></ClosedTradesPage>
                </Route>
                <Route path='/trade-stats'>
                    <TradeStatsPage></TradeStatsPage>
                </Route>
            </Switch>       
        </Layout>
    );
}

export default App;
