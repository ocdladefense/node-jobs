
/**
 * @module Job
 * @classdesc This class helps normalize data into job objects. 
 */
class Job {
    /**
     * @constructor 
     * @param {string} jobTitle - The title of the job.
     */
    constructor(jobTitle="") {
        this.id = "";
        this.ownerId = "",
        this.jobTitle = jobTitle;
        this.salary = "";
        this.datePosted = "";
        this.dateClosing = "";
        this.fileUrl = "";
        this.employer = "";
        this.location = "";
        this.openUntilFilled = "";
    }

    /**
     * 
     * @param {JSON} data - A JSON object
     * @returns {Job} - A Job object
     */
    static fromJson(data) {
        let job = new Job(data.jobtitle);
        for (let prop in data) {
            job[prop] = data[prop];
        }
        return job;
    }

    static fromFormData(formData) {
        // set each relevant property on the job constructor
        let formValues = formData.values;
        let job = new Job();
        job.ownerId = USER_ID;
        job.jobTitle = formValues.get("title");
        job.salary = formValues.get("salary");
        job.datePosted = formValues.get("date-posted");
        job.dateClosing = formValues.get("date-closing");
        job.fileUrl = formValues.get("file-upload");
        job.employer = formValues.get("employer");
        job.location = formValues.get("location");
        job.openUntilFilled = formValues.get("open-until-filled");
        console.log(job);
        return job;
    }

    static fromSObject(SObject) {

    }

    toSObject() {
        return {
            PostingDate__c: this.datePosted,
            ClosingDate__c: this.dateClosing,
        };
    }

    isOwner(id) {
        return id == this.ownerId;
    }
}
export default Job;
