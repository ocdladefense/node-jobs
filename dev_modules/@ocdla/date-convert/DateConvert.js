
/**
 * @module DateConvert
 * @classdesc This class helps normalize data into job objects. 
 */
class DateConvert {
  /**
   * @constructor
   */
  constructor(dateString="") {
    this.dateString = dateString
  }

  toISO() {
    let dateObject;

    // If no date string is provided, use the current date
    if (this.dateString == "") {
      dateObject = new Date();
    // Otherwise, use the given date
    } else {
      dateObject = new Date(this.dateString); 
    }

    // Converting to ISO string
    let isoString = dateObject.toISOString()

    // Splitting into date and time
    let isoDateTime = isoString.split("T", 1);

    // Returning just the date
    return isoDateTime[0];
  }

  xDaysLater(x) {
    // Turning the dateString back into a Date object
    let date = new Date(this.dateString);

    // Adding x days (in milliseconds) to the date
    let xDaysLater = date.getTime() + x * 24 * 60 * 60 * 1000;

    // Turning that back into an object cause the previous step made it a string I guess
    let nextDate = new Date(xDaysLater);

    // Setting this.dateString as a date only
    this.dateString = nextDate.toLocaleDateString();

    // Returning the incremented isoDateString
    return this.toISO();
  }
}

export default DateConvert;

