/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import SalesforceRestApi from "@ocdla/salesforce/SalesforceRestApi.js";
import Job from "@ocdla/employment/Job.js";
import Component from "./Component.js";
import JobCard from "./JobCard.js";




export default class JobList extends Component {

  // Reference to the SalesforceRestApi object.
  #api;


  // Internal list of records.
  #records;


  constructor() {
    super();
    this.actions = ["delete"];
    this.api = new SalesforceRestApi(INSTANCE_URL, ACCESS_TOKEN);
  }

  getRecords() {
    return this.records;
  }

  listenTo(event) {
    let elem = document.querySelector("#job-container");
    elem.addEventListener(event, this);
  }

  async onRequestDelete(dataset) {
    let id = dataset.id;
    let resp = await this.api.delete("Job__c", id);

    if(resp.ok) {
      const e = new CustomEvent("rerender", { detail: this });
      document.dispatchEvent(e);
    }
    else
    {
      window.alert("An error occurred while deleting the record.");
    }

  }


  // async onRequestDelete(job) {
  //   let message;
  //   let userId = USER_ID;

  //   if (!job.isOwner(userId)) {
  //     throw new Error("You don't have permission to perform this action.");
  //   }

  //   try {
  //     await this.deleteJob(job.id);
  //     message = "The record was deleted.";
  //   } catch (e) {
  //     message = e.message;
  //   }

  //   await this.loadData(this.records);

  //   return;
  // }

 


  async loadData() {
      let resp = await this.api.query(QUERY);
      this.records = resp.records.map((record) => Job.fromSObject(record));
  }

  render() {
    let jobs = this.records;
    let userId = USER_ID;
    //let message = props.error || props.message || "";
    let message = "";

    return (
      <div class="full-container">
        
        <div style="color:red;" class="error">
          {message}
        </div>

        <a href="#new" style="margin-bottom: 15px; display: block;" id="button">
          Create a Job Posting
        </a>

        {jobs.length > 0 ? ("") : ("There are no jobs posted")}
        <div class="list-group">
          {jobs.map((job) => (
            <JobCard job={job} isOwner={job.isOwner(userId)} />
          ))}
        </div>
      </div>
    );
  }
}
