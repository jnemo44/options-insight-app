import React from 'react';
import {Modal} from "react-bootstrap";
import AdjustTradeForm from "../AdjustTrade/AdjustTradeForm";


const FormDisplayed = props => {
    let { form } = props

    switch (form) {
        case "close":
            return <div>Close Trade Modal</div>
            break
        case "adjust":
            return <div>Adjust Trade Modal</div>
            break
        default:
            return <div>No Modal Just Trade Table</div>
    }
}

export default FormDisplayed;