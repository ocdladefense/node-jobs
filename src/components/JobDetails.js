/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import Component from "./Component.js";
import {RecordList} from "@ocdla/employment/Job.js";


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
    return (
      <div>
        <h1>Details Component</h1>
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

