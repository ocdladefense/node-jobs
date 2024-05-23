/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import Component from "./Component.js";
import {RecordList} from "@ocdla/employment/Job.js";
import Job from "@ocdla/employment/Job.js";



export default class JobDetails extends Component {
  useMock = USE_MOCK_RECORDS;

  record;

  recordId;

  constructor(recordId) {
    super();
    this.recordId = recordId;
    this.actions = [];
  }

  render() {
    let job = this.record;

    return (
      <div class="container mt-5">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Job Title: {job.title}</h2>
          </div>
          <div class="card-body">
            <h5 class="card-subtitle mb-2 text-muted">Open Until Filled? {job.openUntilFilled ? ("Yes") : ("No")}</h5>
            <h5 class="card-subtitle mb-2 text-muted">Company: {job.employer}</h5>
            <p class="card-text"><strong>Location:</strong> {job.location}</p>
            <p class="card-text"><strong>Salary:</strong> {job.salary}</p>
            <p class="card-text"><strong>Attachements: {job.fileUrl}</strong></p>
            <p class="card-text"><strong>Description:</strong></p>
            <p class="card-text">{job.description}</p>

          </div>
          <div class="card-footer text-muted">
            Posted on: {job.postingDate} 
          </div>
        </div>
      </div>
    );
 }

  async loadData() {
    if (this.recordId == null) {
      this.record = new Job();
      return;
    }
    if (this.useMock) {
      let records = await Job.getMockData();
      let list = new RecordList(records);
      this.record = list.getRecord(this.recordId);
    } else {
      let resp = await this.api.query(
        "SELECT OwnerId, Id, Name, Salary__c, PostingDate__c, ClosingDate__c, AttachmentUrl__c, Employer__c, Location__c, OpenUntilFilled__c, Description__c FROM Job__c WHERE Id = '" +
          this.recordId +
          "'"
      );
      let list = new RecordList(resp.records);
      this.record = list.getRecord(this.recordId);
    }
  }
}

