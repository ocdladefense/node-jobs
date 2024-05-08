
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
        return new Job(
            data.id,
            data.ownerId,
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
    static toSObject(data){
        
        let Job = {
                "Id": data.id,
                "Name": data.jobTitle,
                "Salary__c": data.salary,
                "PostingDate__c": data.datePosted,
                "ClosingDate__c": data.dateClosing,
                "AttachmentUrl__c": "https:/this-domain.org/documents/requirements",
                "Employer__c": data.employer,
                "Location__c": data.location,
                "OpenUntilFilled__c": data.openUntilFilled,
        };
        return Job
    }
    

    isOwner(id) {
        return id == this.ownerId;
    }
}

export default Job;
