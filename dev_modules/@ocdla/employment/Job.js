import DateConvert from "@ocdla/date-convert/DateConvert.js";

/**
 * @module Job
 * @classdesc This class helps normalize data into job objects. 
 */
export default class Job {
  /**
   * @constructor
   * @param {string} title - The title of the job.
   */
  constructor(title = "") {
    this.id = "";
    this.ownerId = "";
    this.title = title;
    this.salary = "";
    this.postingDate = new DateConvert().toISO();
    this.closingDate = new DateConvert(this.postingDate).xDaysLater(30);
    this.fileUrl = "";
    this.employer = "";
    this.location = "";
    this.openUntilFilled = true;
    this.description = "";
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
    let vals = formData;
    let job = new Job();

    job.ownerId = vals.get("owner-id");
    job.id = vals.get("id");
    job.title = vals.get("title");
    job.salary = vals.get("salary");
    job.postingDate = vals.get("posting-date");
    job.closingDate = vals.get("closing-date");
    job.fileUrl = vals.get("file-upload");
    job.employer = vals.get("employer");
    job.location = vals.get("location");
    job.openUntilFilled = vals.get("open-until-filled");
    job.isActive = ""; //finish this? a checkbox on the form, have some instructions
    job.description = vals.get("description");

    return job;
  }

  static fromSObject(SObject) {
    let job = new Job();

    job.id = SObject.Id; //
    job.ownerId = SObject.OwnerId;
    job.title = SObject.Name;
    job.salary = SObject.Salary__c;
    job.postingDate = SObject.PostingDate__c;
    job.closingDate = SObject.ClosingDate__c;
    job.fileUrl = SObject.AttachmentUrl__c;
    job.employer = SObject.Employer__c;
    job.location = SObject.Location__c;
    job.openUntilFilled = SObject.OpenUntilFilled__c;
    job.description = SObject.Description__c;

    return job;
  }

  toSObject() {
    return {
      Name: this.title,
      Id: this.id,
      AttachmentUrl__c: this.fileUrl,
      PostingDate__c: this.postingDate,
      ClosingDate__c: this.closingDate,
      OpenUntilFilled__c: this.openUntilFilled,
      Employer__c: this.employer,
      IsActive__c: this.isActive,
      Location__c: this.location,
      Salary__c: this.salary,
      Description__c: this.description,
    };
  }

  isOwner(id) {
    return true; //id == this.ownerId;
  }

  // static getCurrentDateISOFormat() {
  //   let date = new DateConvert();
  //   return date.toISO();
  // }

  static async getMockData() {

    let j1 = {
      OwnerId: "0",
      Id: "0",
      Name: "Legal Maverick",
      Salary__c: "$80,000",
      PostingDate__c: "2024-04-20",
      ClosingDate__c: "2024-05-29",
      FileUrl__c: "https://my-domain.com/document1",
      Employer__c: "Veritas Law Group",
      Location__c: "Rivertown Junction",
      OpenUntilFilled__c: false,
      Description: "",
    };

    let j2 = {
      OwnerId: "1",
      Id: "1",
      Name: "Trial Whisperer",
      Salary__c: "$110,000",
      PostingDate__c: "2024-02-28",
      ClosingDate__c: "2024-05-10",
      FileUrl__c: "https:/this-domain.org/documents/requirements",
      Employer__c: "JusticeShield Attorneys",
      Location__c: "Cedarwood Heights",
      OpenUntilFilled__c: true,
      Description: "",
    };

    let j3 = {
      OwnerId: "2",
      Id: "2",
      Name: "Justice Architect",
      Salary__c: "$96,000",
      PostingDate__c: "2024-04-17",
      ClosingDate__c: "2024-06-01",
      FileUrl__c: "https://a-domain.law/justice-architect",
      Employer__c: "Liberty Legal Associates",
      Location__c: "Haborview Bay",
      OpenUntilFilled__c: false,
      Description: "",
    };

    let mockJobs = [
      Job.fromSObject(j1),
      Job.fromSObject(j2),
      Job.fromSObject(j3),
    ];

    return Promise.resolve(mockJobs);
  }
}



export class RecordList {

    records;

  constructor(records) {

      this.records = records;
  }

  getRecord(recordId) {
    // Job.fromSObject(record))[0];
    let result = this.records.filter((record) => record.id == recordId);
    return result.length > 0 ? result[0] : null;
  }
}