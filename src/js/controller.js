/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import SalesforceRestApi from "../../node_modules/@ocdla/salesforce/SalesforceRestApi.js";
import JobForm from "../components/JobForm.js";
import JobList from "../components/JobList.js";
import Job from "../../node_modules/@ocdla/employment/Job.js";



export default class Controller {
  records;
  useMock = USE_MOCK_RECORDS;

  static actions = ["new", "save", "edit", "delete", "cancel"];

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
    let openValue = this.getUserInput("openUntilFilled");
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
    let id = target.dataset.id;
    let job;
    let message = "";
    let nextRender;
    let method = "on"+action;

    // Bail out if we're not interested in the user's interaction.
    if (
      dataset == null ||
      action == null ||
      !Controller.actions.includes(action)
    ) {
      return;
    }

    // Construct a Job object when necessary.
    if (["save", "delete"].includes(action)) {
      job = this.getFormData();
    } else if (action == "new") {
      job = new Job();
    } else if(action == "edit") {
      job = this.getRecord(id);
    }


/*
  try {
    nextRender = this[method](job);
  } catch(e) {
    console.log(e);
    window.alert(e.message);
  }

*/

// Everything below this line get replaced with individual methods.

    if (action == "new") {
      nextRender = <JobForm job={job} />;
    }

    if (action == "edit") {
      

      if (job == null) {
        nextRender = (
          <JobList
            jobs={this.records}
            message="You can't edit this at this time."
            ownerId={USER_ID}
          />
        );
      } else {
        nextRender = <JobForm job={job} />;
      }
    }

    if (action == "cancel") {
      nextRender = <JobList jobs={this.records} ownerId={USER_ID} />;
    }

    if (action == "save") {
      if (!!job.Id) {
        this.updateJob(job);
      } else {
        await this.createJob(job);
      }
      await this.getJobs();
      nextRender = (
        <JobList jobs={this.records} message="Yay, you created a new job!" />
      );
    }

    if (action == "delete") {
      try {
        this.deleteJob(job.id);
        await this.getJobs();
        message = "Everything good!";
      } catch (e) {
        message = e.message;
      }

      nextRender = (
        <JobList jobs={this.records} message={message} ownerId={USER_ID} />
      );
    }


    // Everything above this line gets nuked and replaced with individual methods.

    // Lines 151-162 of code handles the file upload
    const formData = new FormData();

    for (let i=0; i < files.files.length; i++) {
        formData.append("files", files.files[i]);
    }

    fetch('/uploads', {
        method: 'POST',
        body: formData,
    })
    .then(res => res.json())
    .then(data => console.log(data));

    this.view.update(nextRender);
    return false;
  }



  getRecord(recordId) {
    let result = this.records.filter((record) => record.id == recordId);
    return result.length > 0 ? result[0] : null;
  }



  async getJobs() {
    if (this.useMock) {
      this.records = await this.getMockData();
    } else {
      let resp = await this.api.query(
        "SELECT OwnerId, Id, Name, Salary__c, PostingDate__c,ClosingDate__c, AttachmentUrl__c, Employer__c,Location__c,OpenUntilFilled__c FROM Job__c"
      );

      this.records = resp.records.map((record) => Job.fromSObject(record));

      //let request = await this.api.query(QUERY);
      // this.records = request.records;
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



  async deleteJob(id) {
    await this.api.delete("Job__c", id);
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
}
