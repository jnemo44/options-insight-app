import  { Route, Switch} from 'react';

import Layout from "./components/Layout/Layout"
import NewTrade from "./containers/NewTrade/NewTrade"

function App () {
    return (
      <div>
        <NewTrade></NewTrade>
      </div>
    );
}

export default App;
