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
    alert('A name was submitted: ' + this.state.value);
  }

  inputChangedHandler (event) {
    this.setState({value: event.target.value});
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
            //changed={(event) => this.inputChangedHandler(event)}/>
            changed={this.inputChangedHandler}/>
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
            <Button></Button>
          </div>
        </div>
      </form>
    );

  }
  
}

export default NewTrade;