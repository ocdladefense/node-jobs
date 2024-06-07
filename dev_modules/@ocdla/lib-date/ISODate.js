export { ISODate };

class ISODate {
    /**
     * Default options for date formatting.
     */
    OPTIONS = { year: "numeric", month: "long", day: "2-digit", hour: "numeric", minute: "numeric", hc: "h12" }
    DATEOPTIONS = { year: "numeric", month: "long", day: "2-digit", timeZone: "UTC" }
    FULLDATEOPTIONS = { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "UTC" }

    date = null;
    /**
     * Constructs an ISODate object.
     * @param {string} datetime - The date and time in ISO format.
     */
    constructor(datetime) {
        ISODate.isValid(datetime);
        this.date = new Date(datetime);
    }

    /**
     * Checks if a date is valid.
     * @param {string} date - The date in ISO format.
     * @returns {boolean} True if the date is valid, false otherwise.
     */
    static isValid(date) {
        // is date a string?
        if (!(typeof date == "string")) {
            date = ISODate.dateToString(date);
        }
        let daysInMonth = {
            1: 31,
            2: 28,
            3: 31,
            4: 30,
            5: 31,
            6: 30,
            7: 31,
            8: 31,
            9: 30,
            10: 31,
            11: 30,
            12: 31
        };
        //example date 2023-07-01
        let parts = date.split("-");
        let month = parts[1];
        month = parseInt(month);
        let day = parts[2];
        day = parseInt(day);
        return day <= daysInMonth[month];
    }

    /**
     * Gets the full date.
     * @returns {Date} The full date.
     */
    getFullDate() {
        return this.date;
    }

    /**
     * Gets the full date in a pretty format.
     * @returns {string} The full date in a pretty format.
     */
    getFullPrettyDate() {
        return new Date(this.date).toLocaleDateString("en-US", this.OPTIONS);
    }

    /**
     * Gets the date in a pretty format.
     * @returns {string} The date in a pretty format.
     */
    getPrettyDate() {
        return new Date(this.date).toLocaleDateString("en-US", this.DATEOPTIONS);
    }

    /**
     * Gets the date in ISO format.
     * @returns {string} The date in ISO format.
     */
    getDate() {
        let isoString = this.date.toISOString().split("T");
        return isoString[0];
    }

    /**
     * Converts a date to a string in ISO format.
     * @param {Date} date - The date to convert.
     * @returns {string} The date in ISO format.
     */
    static dateToString(date) {
        let isoString = date.toISOString().split("T");
        return isoString[0];
    }

    /**
     * Checks if the date is after a specified date.
     * @param {string} datetime - The date to compare with.
     * @returns {boolean} True if the date is after the specified date, false otherwise.
     */
    isAfter(datetime) {
        return (max >= start && start >= min);
    }

    /**
     * Checks if the date is before a specified date.
     * @param {string} datetime - The date to compare with.
     * @returns {boolean} True if the date is before the specified date, false otherwise.
     */
    isBefore(datetime) {
        return (max >= end && end >= min)
    }

    /**
     * Gets the date of an event.
     * @param {Object} event - The event to get the date of.
     * @returns {string} The date of the event.
     */
    eventDate(event) {
        return (event.start.date ? this.getPrettyDate() : this.getFullPrettyDate());
    }

    /**
     * Adds a specified number of days to the date.
     * @param {number} days - The number of days to add.
     * @returns {ISODate} A new ISODate object with the added days.
     */
    addDays(days) {
        let newDate = new Date(this.date);
        newDate.setDate(newDate.getDate() + days);
        return new ISODate(newDate);
    }

    /**
     * Checks if the date is equal to another date.
     * @param {ISODate} other - The other date to compare with.
     * @returns {boolean} True if the dates are equal, false otherwise.
     */
    __eq__(other) {
        return this.date == other.date;
    }
}
