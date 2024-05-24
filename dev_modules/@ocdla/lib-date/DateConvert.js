
/**
 * @module DateConvert
 * @classdesc This class helps normalize data into job objects. 
 */
class DateConvert {
  /**
   * @constructor
   */

  #date;

  constructor(dateStringOrObject) {    
    if (dateStringOrObject instanceof Date) {
      this.date = dateStringOrObject;
    } else if (typeof dateStringOrObject == "string") {
      this.date = new Date(dateStringOrObject);
    } else if (typeof dateStringOrObject == "undefined") {
      this.date = new Date();
    }
    // "02-27-2006" 
  }

  toISO() {
    // Converting to ISO string
    let isoString = this.date.toISOString()

    // Splitting into date and time
    let isoDateTime = isoString.split("T", 1);

    // Returning just the date
    return isoDateTime[0];
  }

  addDays(numDays) {
    // Adding x days (in milliseconds) to the date
    let xDaysLater = this.date.getTime() + numDays * 24 * 60 * 60 * 1000;

    // Turning that back into an object cause the previous step made it a string I guess
    let nextDate = new Date(xDaysLater);

    return new DateConvert(nextDate)
  }
}

export default DateConvert;

