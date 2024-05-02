
/**
 * @module Job
 * @classdesc This class helps normalize data into job objects. 
 */
class Job {
    /**
     * @constructor 
     * @param {string} jobTitle - The title of the job.
     * @param {string} salary - The salary for the job. This may need to be an int in future versions.
     * @param {string} datePosted - The date the job posting was made. This may need to change in future versions.
     * @param {string} dateCosing - The date the job will close. This may need to change in future versions.
     * @param {string} fileUrl - The url to any documents included in the Job posting.
     * @param {string} employer - The name of the employer.
     * @param {string} location - The location of the position.
     * @param {bool} openUntilFilled - A boolean representing if the job should close when filled or not.
     */
    constructor(jobTitle, salary, datePosted, dateClosing="", fileUrl="", employer, location, openUntilFilled) {
        this.jobTitle = jobTitle;
        this.salary = salary;
        this.datePosted = datePosted;
        this.dateClosing = dateClosing;
        this.fileUrl = fileUrl;
        this.employer = employer;
        this.location = location;
        this.openUntilFilled = openUntilFilled;
    }

    /**
     * 
     * @param {JSON} data - A JSON object
     * @returns {Job} - A Job object
     */
    static newFromJSON(data) {
        return new Job(
            data.jobTitle,
            data.salary,
            data.datePosted,
            data.dateClosing,
            data.fileUrl,
            data.employer,
            data.location,
            data.openUntilFilled
        );
    }
}

export default Job;
