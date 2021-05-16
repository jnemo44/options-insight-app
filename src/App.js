import  { Route, Switch} from 'react';

import Layout from "./components/Layout/Layout";
import OpenTradesPage from "./pages/OpenTrades";

function App () {
    return (
      <div>
        <Layout>
            <Route path='/' exact={true}>
              <OpenTradesPage></OpenTradesPage>
            </Route>
        </Layout>
      </div>
    );
}

export default App;
