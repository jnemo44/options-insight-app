import  { Route, Switch} from 'react-router-dom';

import Layout from "./components/Layout/Layout";
import OpenTradesPage from "./pages/OpenTrades";
import ClosedTradesPage from "./pages/ClosedTrades";
import TradeStatsPage from "./pages/TradeStats";

function App () {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact={true}>
                    <OpenTradesPage></OpenTradesPage>
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
