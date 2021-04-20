//Build a new Trade
//Ticker/#Contracts/SellorBuy/OpenPrice/OpenDate/Type
import React from 'react';
import Input from '../../UI/Input';

const tradeInfo = () => {
    return (
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
          <button>This is a button</button>
        </div>
      </div>
    )
  
}

export default tradeInfo;