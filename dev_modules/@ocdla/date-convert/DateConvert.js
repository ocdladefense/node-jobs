
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
}

export default DateConvert;

