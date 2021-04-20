//Build a new Trade
//Ticker/#Contracts/SellorBuy/OpenPrice/OpenDate/Type
import React, { Component } from 'react';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';

class NewTrade extends Component {
  state = {
      newTradeForm: null
  }

  newTradeHandler () {
    console.log("Santas got a brand new bag");
  }

  render () {
    return (
      <form onSubmit={this.newTradeHandler}>
        <div>
          <Input 
            name="ticker" 
            type="text" 
            label="Ticker"
            placeholder="AAPL"/>
          <Input 
            name="numcontracts" 
            type="number" 
            label="Number of Contracts" 
            placeholder="-1"/>
          <Input 
            name="openprice" 
            type="number" 
            label="Open Price" 
            placeholder="2.75"/>
          <div>
            <button type="submit">Hello Darkness</button>
          </div>
        </div>
      </form>
    );

  }
  
}

export default NewTrade;