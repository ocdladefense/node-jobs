/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import SalesforceRestApi from "../../node_modules/@ocdla/salesforce/SalesforceRestApi.js";
import JobForm from "../components/JobForm.js";
import JobList from "../components/JobList.js";
import Job from "../../node_modules/@ocdla/employment/Job.js";



export default class Controller {
  records;
  useMock = USE_MOCK_RECORDS;
  validActions = ["new", "save", "edit", "delete",  "cancel"];

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
    let elem = document.querySelector(this.selector);
    elem.addEventListener(event, this);
  }



  getFormData() {
    let openValue = this.getUserInput("openUntilFilled")
    let isOpen = openValue == "on" ? true : false;
    let idvalue = this.getUserInput("id");
    let id = idvalue == "" ? null : id;
    // Convert to Job object first.
    let job = Job.newFromJSON({
      ownerId: USER_ID,
      id: id,
      jobTitle: this.getUserInput("title"),
      salary: this.getUserInput("salary"),
      datePosted: this.getUserInput("datePosted"),
      dateClosing: this.getUserInput("dateClosing"),
      fileUrl: "https://a-domain.law/justice-architect",
      employer: this.getUserInput("employer"),
      location: this.getUserInput("location"),
      openUntilFilled: isOpen,
    });
    // Then, needs to be converted from Job object to Salesforce "SObject", i.e., job.toSObject();
    // So this conversion, which you are doing manually here, should be done in the Job class.uh



    return Job.toSObject(job);
  }



  async handleEvent(e) {
    let target = e.target;
    let dataset = target.dataset;
    let action = target.dataset.action;
    if (dataset == null || action == null || !this.validActions.includes(action)){
      return;
    }

    if (action == "new") {
      let job = new Job;
      this.view.update(<JobForm job={job} />);
    }

    if (action == "edit") {
      let id = target.dataset.id;
      let selectedJob = this.searchJobs(id);
      if (selectedJob == undefined){
        this.view.update(<JobList jobs={this.records} message="You can't edit this at this time." ownerId={USER_ID} />);
        return;
      }
      else{
        this.view.update(<JobForm job={selectedJob} />);
        return;
      }
    }
    if (action == "cancel") {
      this.view.update(<JobList jobs={this.records} ownerId={USER_ID} />);
    }


    let job = this.getFormData();

    if (action == "save") {
      
      if (!!job.Id) {
        this.updateJob(job);
      } else {
        await this.createJob(job);
      }
      await this.getJobs();
      this.view.update(<JobList jobs={this.records} />)
    }
    
    if (action == "delete") {
      this.deleteJob(job.id);
      await this.getJobs();
      this.view.update(<JobList jobs={this.records} message="your posting was succesfully deleted" ownerId={USER_ID} />);
    }

    



    
  }

  searchJobs(jobId) {

    
    let result = this.records.filter((record) => record.id == jobId);
    return result.length > 0 ? result[0] : undefined; 
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
    let normalizedJob = {
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
    };
    return normalizedJob;
  }



  render() {
    this.view.render(<JobList jobs={this.records} ownerId={USER_ID} />);
    this.listenTo("click");
  }


  async createJob(job) {
    await this.api.create("Job__c", job);
  }



  async updateJob(job) {
    let temp = await this.api.update("Job__c", job);
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
    await this.api.delete("Job__c", id);
  }
}
