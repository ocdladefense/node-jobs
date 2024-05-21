/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import SalesforceRestApi from "@ocdla/salesforce/SalesforceRestApi.js";
import JobCard from "./JobCard.js";
import Job from "@ocdla/employment/Job.js";



export default class JobList {
  records;
  useMock = USE_MOCK_RECORDS;

  static actions = ["delete"];

  constructor() {
    this.api = new SalesforceRestApi(INSTANCE_URL, ACCESS_TOKEN);
    //this.view = View.createRoot(this.selector);
  }

  returnRecords() {
    return this.records;
  }

  listenTo(event) {
    let elem = document.querySelector("#job-container");
    elem.addEventListener(event, this);
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
      !JobList.actions.includes(action)
    ) {
      return;
    }

    // Construct a Job object when necessary.

    job = this.getRecord(id);


    method = "onRequest" + this.toTitleCase(action);

    try {
      e.preventDefault();
      nextRender = await this[method](job);
    } catch (e) {
      console.log(e, method);

      window.alert(e.message);
    }

    window.location.assign("#");
    window.location.reload();
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

    await this.loadData(this.records);

    return;
  }

  async deleteJob(id) {
    if (this.useMock) {
      this.records = this.records.filter((record) => record.id != id);
    }
    else await this.api.delete("Job__c", id);
  }


  getRecord(recordId) {
    let result = this.records.filter((record) => record.id == recordId);
    return result.length > 0 ? result[0] : null;
  }

  async loadData(records) {
    if (this.useMock) {
      this.records = records || await Job.getMockData();
    } else {
      let resp = await this.api.query(QUERY);
      this.records = resp.records.map((record) => Job.fromSObject(record));
    }
  }

  render() {
    let jobs = this.records;
    let userId = USER_ID;
    //let message = props.error || props.message || "";
    let message = "";

    return (
      <div>
        <div style="color:red;" class="error">{message}</div>

        <a href="#new" style="margin-bottom: 15px; display: block;" id="button">Create a Job Posting</a>
        <div class="list-group">
          {jobs.map(job => <JobCard job={job} isOwner={job.isOwner(userId)} />)}
        </div>
      </div>
    );
  }


  



  toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}
