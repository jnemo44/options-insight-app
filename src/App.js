import  React, { Component, useState } from 'react';

import Layout from "./components/Layout/Layout"
import NewTrade from "./containers/NewTrade/NewTrade"

class App extends Component {
  render() {
    return (
      <div>
        <Layout></Layout>
      </div>
    );
  }
}

export default App;
