
/**
 * @module Job
 * @classdesc This class helps normalize data into job objects. 
 */
class Job {
    /**
     * @constructor 
     * @param {string} jobTitle - The title of the job.
     */
    constructor(title = "") {
        this.id = "";
        this.ownerId = "";
        this.title = title;
        this.salary = "";
        this.datePosted = "";
        this.dateClosing = "";
        this.fileUrl = "";
        this.employer = "";
        this.location = "";
        this.openUntilFilled = true;
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
        job.isActive = ""; //finish this? a checkbox on the form, have some instructions
        return job;
    }

    static fromSObject(SObject) {
        let job = new Job();
        job.id = SObject.Id; //
        job.ownerId = SObject.OwnerId, //
        job.jobTitle = SObject.Name; //
        job.salary = SObject.Salary__c;
        job.datePosted = SObject.PostingDate__c;
        job.dateClosing = SObject.ClosingDate__c;
        job.fileUrl = SObject.AttachmentUrl__c;
        job.employer = SObject.Employer__c;
        job.location = SObject.Location__c;
        job.openUntilFilled = SObject.OpenUntilFilled__c;
    }

    toSObject() {
        return {
            AttachementUrl__c: this.fileUrl,
            ClosingDate__c: this.dateClosing,
            Employer__c: this.employer,
            IsActive__c: this.isActive, 
            Location__c: this.location,
            OpenUntilFilled__c: this.openUntilFilled,
            PostingDate__c: this.datePosted,
            Salary__c: this.salary
        };
    }

    isOwner(id) {
        return id == this.ownerId;
    }
}
export default Job;
