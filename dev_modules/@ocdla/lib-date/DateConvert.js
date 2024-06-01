/**
 * @module DateConvert
 * @classdesc This class helps normalize data into job objects. 
 */
export class DateConvert {
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

export default function colloquial(theDate) {
  let now = new Date();
  now.setHours(0, 0, 1, 0)

  let date = new Date(theDate);
  date.setHours(0, 0, 1, 0)
  // This line of code is to offset the fact that the date is parsed in a different time zone?
  date = new Date(date.getTime() + 86400000);

  let colloquial = "";

  let isFuture = date > now ? true : false;

  let diffInMil = isFuture ? date.getTime() - now.getTime() : now.getTime() - date.getTime();
  let differenceDays = Math.round(diffInMil / (1000 * 3600 * 24))

  if (differenceDays == 0) {
    colloquial = "today";
  } else if (differenceDays == 1) {
    colloquial = isFuture ? "tomorrow" : "yesterday";
  } else {
    colloquial = isFuture ? "in " + (differenceDays) + " days" : differenceDays + " days ago";
  }

  return colloquial;

}