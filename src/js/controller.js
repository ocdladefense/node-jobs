/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import SalesforceRestApi from "../../node_modules/@ocdla/salesforce/SalesforceRestApi.js";
import JobForm from "../components/JobForm.js";
import JobList from "../components/JobList.js";
import Job from "../../node_modules/@ocdla/employment/Job.js";



export default class Controller {
  records;
  useMock = USE_MOCK_RECORDS;

  static actions = ["create", "save", "edit", "delete", "cancel"];

  constructor(selector) {
    this.selector = selector;
    this.api = new SalesforceRestApi(INSTANCE_URL, ACCESS_TOKEN);
    this.view = View.createRoot(this.selector);
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
    let formEl = document.getElementById("record-form");
    let formData = new FormData(formEl);

    let job = Job.fromFormData(formData);

    // Then, needs to be converted from Job object to Salesforce "SObject", i.e., job.toSObject();
    // So this conversion, which you are doing manually here, should be done in the Job class.uh

    return job.toSObject();
  }

  async handleEvent(e) {
    let target = e.target;
    let dataset = target.dataset;
    let action = target.dataset.action;
    let id = target.dataset.id;
    let job;
    let nextRender;
    let method;

    // Bail out if we're not interested in the user's interaction.
    if (
      dataset == null ||
      action == null ||
      !Controller.actions.includes(action)
    ) {
      return;
    }

    // Construct a Job object when necessary.
    if (["save"].includes(action)) {
      job = this.getFormData();
    } else if (action == "create") {
      job = new Job();
    } else if (action == "edit" || action == "delete") {
      job = this.getRecord(id);
    }


  method = "onRequest" + this.toTitleCase(action);

    try {
      nextRender = await this[method](job);
    } catch (e) {
      console.log(e, method);

      window.alert(e.message);
    }

    this.view.update(nextRender);
  }

  async onRequestDelete(job) {
    let message;
    let userId = USER_ID;

    if (!job.isOwner(userId)) {
      throw new Error("You don't have permission to perform this action.");
    }

    try {
      await this.deleteJob(job.id);
      message = "The record was deleted.";
    } catch (e) {
      message = e.message;
    }

    await this.getJobs(this.records);

    return <JobList jobs={this.records} message={message} ownerId={userId} />;
  }

  async deleteJob(id) {
    if (this.useMock) {
      this.records = this.records.filter((record) => record.id != id);
    }
    else await this.api.delete("Job__c", id);
  }

  onRequestCreate(job) {
    return <JobForm job={job} />;
  }

  onRequestEdit(job) {
    let userId = USER_ID;
    if (job == null || !job.isOwner(userId)) {
      return (
        <JobList
          jobs={this.records}
          message="You don't have permission to perform this action."
          ownerId={userId}
        />
      );
    } else {
      return <JobForm job={job} />;
    }
  }

  async onRequestSave(job) {
    if (!!job.Id) {
      this.updateJob(job);
    } else {
      await this.createJob(job);
    }
    await this.getJobs();
    return <JobList jobs={this.records} message="The record was created." />;
  }

  onRequestCancel() {
    return <JobList jobs={this.records} ownerId={USER_ID} />;
  }

  getRecord(recordId) {
    let result = this.records.filter((record) => record.id == recordId);
    return result.length > 0 ? result[0] : null;
  }

  async getJobs(records) {
    if (this.useMock) {
      this.records = records || await this.getMockData();
    } else {
      let resp = await this.api.query(
        "SELECT OwnerId, Id, Name, Salary__c, PostingDate__c, ClosingDate__c, AttachmentUrl__c, Employer__c, Location__c, OpenUntilFilled__c FROM Job__c"
      );

      this.records = resp.records.map((record) => Job.fromSObject(record));
    }
  }

  render() {
    let initialView = <JobList jobs={this.records} ownerId={USER_ID} />;
    this.currentView = initialView;
    this.view.render(this.currentView);
  }

  renderForm(j) {
    this.view.update(<JobForm job={j} />);
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

  async getMockData() {
    let j1 = {
      OwnerId: "0",
      Id: "0",
      Name: "Legal Maverick",
      Salary__c: "$80,000",
      PostingDate__c: "4/20/2024",
      ClosingDate__c: "5/29/2024",
      FileUrl__c: "https://my-domain.com/document1",
      Employer__c: "Veritas Law Group",
      Location__c: "Rivertown Junction",
      OpneUntilFilled__c: false,
    };

    let j2 = {
      OwnerId: "1",
      Id: "1",
      Name: "Trial Whisperer",
      Salary__c: "$110,000",
      PostingDate__c: "4/28/2024",
      ClosingDate__c: "5/10/2024",
      FileUrl__c: "https:/this-domain.org/documents/requirements",
      Employer__c: "JusticeShield Attorneys",
      Location__c: "Cedarwood Heights",
      OpenUntilFilled__c: true,
    };

    let j3 = {
      OwnerId: "2",
      Id: "2",
      Name: "Justice Architect",
      Salary__c: "$96,000",
      PostingDate__c: "4/17/2024",
      ClosingDate__c: "6/1/2024",
      FileUrl__c: "https://a-domain.law/justice-architect",
      Employer__c: "Liberty Legal Associates",
      Location__c: "Haborview Bay",
      OpenUntilFilled__c: false,
    };

    let mockJobs = [
      Job.fromSObject(j1),
      Job.fromSObject(j2),
      Job.fromSObject(j3),
    ];

    return Promise.resolve(mockJobs);
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}
