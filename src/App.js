import  React, { Component } from 'react';

import Layout from "./components/Layout/Layout"
import NewTrade from "./containers/NewTrade/NewTrade"

class App extends Component {
  render() {
    return (
      <div>
        <NewTrade></NewTrade>
      </div>
    );
  }
}

export default App;
