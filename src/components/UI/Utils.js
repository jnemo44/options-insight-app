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