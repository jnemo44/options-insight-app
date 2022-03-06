import Papa from "papaparse";
import XLSX from "xlsx";

export function calculatePL(trade) {
  let PL = 0;
  if (trade.buyOrSell == "sell") {
    PL = parseFloat(trade.openPrice) - parseFloat(trade.closePrice);
  }
  else {
    PL = parseFloat(trade.closePrice) - parseFloat(trade.openPrice);
  }

  return PL
}

export function calculatePCR(trade, adjustedPL) {
  let PCR = 0;
  console.log(adjustedPL=null)
  if (adjustedPL = null) {
    console.log("Not Adjusted P/L")
    if (trade.buyOrSell == "sell") {
      PCR = calculatePL(trade)/parseFloat(trade.openPrice)*100;
    }
    else {
      PCR = calculatePL(trade)/parseFloat(trade.closePrice)*100;
    }
  }
  else {
    //Adjustment
    console.log("Adjusted P/L")
    if (trade[0]?.buyOrSell == "sell") {
      PCR = adjustedPL/trade[0]?.openPrice*100;
    }
    else {
      //??Need to find the last trade index so I can use the final close price for this
      PCR = adjustedPL/trade[-1]?.closePrice*100;
    }
    
  }
  return PCR
}


export function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

export function convertDate(date) {
  var dateObject = new Date(date)
  return new Date(dateObject.getTime() + Math.abs(dateObject.getTimezoneOffset() * 60000));
}

export function sortDate(trades) {
  var sortedDates
  return sortedDates = trades.sort((dateA, dateB) => new Date(dateB.openDate) - new Date(dateA.openDate));
}

export function getExportFileBlob({ columns, data, fileType, fileName }) {
  if (fileType === "csv") {
    // CSV example
    const headerNames = columns
      .filter((c) => c.Header != "Action")
      .map((col) => col.exportValue);
    const csvString = Papa.unparse({ fields: headerNames, data });
    return new Blob([csvString], { type: "text/csv" });
  } else if (fileType === "xlsx") {
    // XLSX example

    const header = columns
      .filter((c) => c.Header != "Action")
      .map((c) => c.exportValue);
    const compatibleData = data.map((row) => {
      const obj = {};
      header.forEach((col, index) => {
        obj[col] = row[index];
      });
      return obj;
    });

    let wb = XLSX.utils.book_new();
    let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
      header
    });
    XLSX.utils.book_append_sheet(wb, ws1, "React Table Data");
    XLSX.writeFile(wb, `${fileName}.xlsx`);

    // Returning false as downloading of file is already taken care of
    return false;
  }

  return false;
}