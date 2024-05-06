/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import SalesforceRestApi from "../../node_modules/@ocdla/salesforce/SalesforceRestApi.js";
import JobForm from "../components/JobForm.js";
import JobList from "../components/JobList.js";
import Job from "../../node_modules/@ocdla/employment/Job.js";



export default class Controller {
  records;
  useMock = USE_MOCK_RECORDS;

  constructor(selector) {
    this.selector = selector;
    this.api = new SalesforceRestApi(INSTANCE_URL, ACCESS_TOKEN);
    this.view = View.createRoot(this.selector);
  }



  async getMockData() {
    let j1 = Job.newFromJSON({
      ownerId: "0",
      id: "0",
      jobTitle: "Legal Maverick",
      salary: "$80,000",
      datePosted: "4/20/2024",
      dateClosing: "5/29/2024",
      fileUrl: "https://my-domain.com/document1",
      employer: "Veritas Law Group",
      location: "Rivertown Junction",
      openUntilFilled: false,
    });

    let j2 = Job.newFromJSON({
      ownerId: "1",
      id: "1",
      jobTitle: "Trial Whisperer",
      salary: "$110,000",
      datePosted: "4/28/2024",
      dateClosing: "5/10/2024",
      fileUrl: "https:/this-domain.org/documents/requirements",
      employer: "JusticeShield Attorneys",
      location: "Cedarwood Heights",
      openUntilFilled: true,
    });

    let j3 = Job.newFromJSON({
      ownerId: "2",
      id: "2",
      jobTitle: "Justice Architect",
      salary: "$96,000",
      datePosted: "4/17/2024",
      dateClosing: "6/1/2024",
      fileUrl: "https://a-domain.law/justice-architect",
      employer: "Liberty Legal Associates",
      location: "Haborview Bay",
      openUntilFilled: false,
    });

    let mockJobs = [j1, j2, j3];

    return Promise.resolve(mockJobs);
  }



  getUserInput(id) {
    let elem = document.getElementById(id);
    return elem.value;
  }



  listenTo(event) {
    let buttons = document.querySelectorAll('.button'); 

    buttons.forEach((button) => {
        button.addEventListener(event, this.handleEvent.bind(this)); 
    });
}



  getFormData() {
    let jobName = this.getUserInput("name");
    let employer = this.getUserInput("employer");
    let id = this.getUserInput("id");
    let salary = parseInt(this.getUserInput("salary"));
    let date = "2024-04-29";
    // Convert to Job object first.

    // Then, needs to be converted from Job object to Salesforce "SObject", i.e., job.toSObject();
    // So this conversion, which you are doing manually here, should be done in the Job class.uh
    let job = {
      Name: jobName,
      DatePosted__c: date,
      Employer__c: employer,
      Salary__c: salary,
      Id: id,
    };

    return job;
  }



  handleEvent(e) {
    let target = e.target;

    let action = target.dataset.action;

    //let job = this.getFormData();

    if (action == "save") {
      if (!!job.Id) {
        this.updateJob(job);
      } else {
        this.createJob(job);
      }
    }

    if (action == "edit") {
      let id = target.dataset.id;
      let selectedJob = this.searchJobs(id)
      this.view.update(<JobForm job={selectedJob} />);
    }

    if (action == "delete") {
      this.deleteJob(job.Id);

      this.view.update(
        <JobList
          jobs={this.records}
          message="your posing was succesfully deleted"
          ownerId={USER_ID}
        />
      );
    }

    if (action == "cancel") {
      this.view.update(<JobList jobs={this.records} ownerId={USER_ID} />);
    }
  }

  searchJobs(Jobid){
    let i = 0;
    let found = false;
    while(i > this.records.length || found == false){
    if(this.records[i].id == Jobid){
      found = true;
      return this.records[i];
    }
    i++;
    }
  }

  async getJobs() {
    if (this.useMock) {
      this.records = await this.getMockData();
    } else {
      let request = await this.api.query(
        "SELECT OwnerId, Id, Name, Salary__c, PostingDate__c,ClosingDate__c, AttachmentUrl__c, Employer__c,Location__c,OpenUntilFilled__c FROM Job__c"
      );
      let jobs = [];
      let i = 0;
      while (i < request.records.length) {
        let normalizedJob = this.jobsNormalizer(request.records[i]);
        jobs.push(normalizedJob);
        i++;
      }
      this.records = jobs;
    }
  }

  jobsNormalizer(job) {
    let normalizedJob = Job.newFromJSON({
      ownerId: job.OwnerId,
      id: job.Id,
      jobTitle: job.Name,
      salary: job.Salary__c,
      datePosted: job.PostingDate__c,
      dateClosing: job.ClosingDate__c,
      fileUrl: job.AttachmentUrl__c,
      employer: job.Employer__c,
      location: job.Location__c,
      openUntilFilled: job.OpenUntilFilled__c,
    });
    return normalizedJob;
  }



  render() {
    this.view.render(<JobList jobs={this.records} ownerId={USER_ID} />);
    this.listenTo("click");
  }


  async createJob(job) {
    await this.api.create("Jobs__c", job);
  }



  async updateJob(job) {
    let temp = await this.api.update("Jobs__c", job);
    if (temp == true) {
      this.view.update(
        <JobList
          jobs={this.records}
          message="your posting was succesfully updated"
          ownerId={USER_ID}
        />
      );
    }
  }



  async deleteJob(id) {
    await this.api.delete("Jobs__c", id);
  }
}
