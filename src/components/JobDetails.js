/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import Component from "./Component.js";
import { RecordList } from "@ocdla/employment/Job.js";
import Job from "@ocdla/employment/Job.js";
import SalesforceRestApi from "@ocdla/salesforce/SalesforceRestApi.js";
import "../css/job-search-design.css";
import colloquial from "@ocdla/lib-date/DateConvert.js";

export default class JobDetails extends Component {


  record;

  recordId;

  constructor(recordId) {
    super();
    this.recordId = recordId;
    this.actions = [];
    this.api = new SalesforceRestApi(INSTANCE_URL, ACCESS_TOKEN);
  }

  render() {
    let job = this.record;
    // job.fileUrl = ""; // THIS IS A TEMPORARY SOLUTION

    return (
      <div class="container sticky">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">
              <a href="#" class="btn btn-secondary">Exit Page</a>
              <div>Job Title: {job.title}</div> <br/>
              <h5 class="card-subtitle mb-2 text-muted">{job.employer} - {job.location}</h5>
            </h2>
          </div>
          <div class="card-body">
            <h5 class="card-subtitle mb-2 text-muted">Date Closing: {colloquial(job.closingDate)}</h5>
            <h5 class="card-subtitle mb-2 text-muted">Open Until Filled? {job.openUntilFilled ? ("Yes") : ("No")}</h5>
            <p class="card-text"><strong>Salary:</strong> {job.salary}</p>
            <p class="card-text">{job.description}</p>
            <p class="card-text">{job.fileUrl}</p>
          </div>
          <div class="card-footer text-muted">
            Posted: {colloquial(job.postingDate)}
          </div>
        </div>
      </div>
    );
  }

  async loadData() {
    let resp = await this.api.query(
      `${QUERY} WHERE Id='${this.recordId}'`
    );
    let list = new RecordList(resp.records);
    this.record = list.getRecord(this.recordId);
    this.record = Job.fromSObject(this.record)
  }
}

