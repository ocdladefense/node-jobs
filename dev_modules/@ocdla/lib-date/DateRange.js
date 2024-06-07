export { DateRange };
import { ISODate } from "./ISODate.js";

class DateRange {
    /**
     * The start date of the range.
     */
    floor = null;
    /**
     * The end date of the range.
     */
    ceiling = null;

    /**
     * Constructs a DateRange object.
     * @param {string} dateStart - The start date of the range in ISO format.
     * @param {string} dateEnd - The end date of the range in ISO format.
     */
    constructor(dateStart = null, dateEnd = null) {
        if (dateStart && dateEnd) {
            if (!ISODate.isValid(dateStart) || !ISODate.isValid(dateEnd)) {
                throw new RangeError("invalid date range", { cause: "INVALID_RANGE" });
            }
            this.floor = dateStart;
            this.ceiling = dateEnd;
        }
    }

    /**
     * Sets the start date of the range.
     * @param {string} floor - The start date of the range in ISO format.
     */
    setFloor(floor) {
        this.floor = floor;
    }

    /**
     * Sets the end date of the range.
     * @param {string} ceiling - The end date of the range in ISO format.
     */
    setCeiling(ceiling) {
        this.ceiling = ceiling;
    }

    /**
     * Creates a new DateRange object with a specified start date.
     * @param {string} floor - The start date of the range in ISO format.
     * @returns {DateRange} A new DateRange object.
     */
    static newFromFloor(floor) {
        let range = new DateRange();
        range.setFloor(floor);
        return range;
    }

    /**
     * Creates a new DateRange object with a specified end date.
     * @param {string} ceiling - The end date of the range in ISO format.
     * @returns {DateRange} A new DateRange object.
     */
    static newFromCeiling(ceiling) {
        let range = new DateRange();
        range.setCeiling(ceiling);
        return range;
    }

    /**
     * Checks if an event is within the date range.
     * @param {string} eventStart - The start date of the event in ISO format.
     * @param {string} eventEnd - The end date of the event in ISO format.
     * @returns {boolean} True if the event is within the date range, false otherwise.
     */
    isWithinRange(eventStart, eventEnd) {
        return (this.floor <= eventStart && eventStart <= this.ceiling) || (this.floor <= eventEnd && eventEnd <= this.ceiling);
    }
}
