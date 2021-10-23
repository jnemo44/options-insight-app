export function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }


export function convertDate(date) {
  var dateObject = new Date(date)
  return new Date(dateObject.getTime() + Math.abs(dateObject.getTimezoneOffset() * 60000));
}