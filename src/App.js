import  { Route, Switch} from 'react-router-dom';

import Layout from "./components/Layout/Layout";
import NewTradeForm from './components/NewTrade/NewTradeForm';
import OpenTradesPage from "./pages/OpenTrades";

function App () {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact={true}>
                    <OpenTradesPage></OpenTradesPage>
                </Route>
                <Route path='/new-trade'>
                    <NewTradeForm></NewTradeForm>
                </Route>
            </Switch>       
        </Layout>
    );
}

export default App;
