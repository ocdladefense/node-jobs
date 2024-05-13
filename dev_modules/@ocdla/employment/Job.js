
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
    static fromSObject(data) {
        let job = new Job();

        job.id = data.Id;
        job.ownerId = data.OwnerId;
        job.title = data.Name;
        job.salary = data.Salary__c;
        job.postingDate = data.PostingDate__c;
        job.closingDate = data.ClosingDate__c;
        job.attachmentUrl = data.AttachmentUrl__c;
        job.employer = data.Employer__c;
        job.location = data.Location__c;
        job.openUntilFilled = data.OpenUntilFilled__c;

        return job;
    }


    static toSObject(data){
        
        return {
            "Id": data.id,
            "Name": data.jobTitle,
            "Salary__c": data.salary,
            "PostingDate__c": data.postingDate,
            "ClosingDate__c": data.closingDate,
            "AttachmentUrl__c": "https:/this-domain.org/documents/requirements",
            "Employer__c": data.employer,
            "Location__c": data.location,
            "OpenUntilFilled__c": data.openUntilFilled,
        };
    }
    

    isOwner(id) {
        return true;
    }
}

export default Job;
