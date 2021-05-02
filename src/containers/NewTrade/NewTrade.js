//Build a new Trade
//Ticker/#Contracts/SellorBuy/OpenPrice/OpenDate/Type
import React, { Component } from 'react';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';

class NewTrade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTradeForm: null,
      ticker: '',
      numContracts: '',
      openPrice: ''
    }

  this.newTradeHandler = this.newTradeHandler.bind(this);
  this.inputChangedHandler = this.inputChangedHandler.bind(this);
  }

  newTradeHandler (event) {
    event.preventDefault();
    alert('A name was submitted: ' + this.state.ticker +
          ' Number of Contracts: ' + this.state.numContracts +
          ' Open Price: ' + this.state.openPrice);
    
  }

  inputChangedHandler (event) {
    const value = event.target.value;
    this.setState({
      ...this.state,
      [event.target.name]: value
    });
  }

  render () {
    return (
      <form onSubmit={this.newTradeHandler}>
        <div>
          <Input 
            name="ticker" 
            type="text" 
            label="Ticker"
            placeholder="AAPL"
            value={this.state.value}
            changed={this.inputChangedHandler}/>
          <Input 
            name="numContracts" 
            type="number" 
            label="Number of Contracts" 
            placeholder="-1"
            value={this.state.value}
            changed={this.inputChangedHandler}/>
          <Input 
            name="openPrice" 
            type="number" 
            label="Open Price" 
            placeholder="2.75"
            value={this.state.value}
            changed={this.inputChangedHandler}/>
          <div>
            <Button></Button>
          </div>
        </div>
      </form>
    );

  }
  
}

export default NewTrade;