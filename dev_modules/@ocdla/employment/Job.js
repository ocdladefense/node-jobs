
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
     * @param {string} fileUrl - The url to any documents included in the Job posting.
     * @param {string} employer - The name of the employer.
     */
    constructor(jobTitle, salary, datePosted, fileUrl="", employer) {
        this.jobTitle = jobTitle;
        this.salary = salary;
        this.datePosted = datePosted;
        this.fileUrl = fileUrl;
        this.employer = employer;
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
            data.fileUrl,
            data.employer
        );
    }
}

export default Job;
