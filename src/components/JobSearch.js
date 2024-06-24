/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import Component from "./Component.js";
import JobList from "../components/JobList.js";
import JobDetails from "../components/JobDetails.js";
import SalesforceRestApi from "@ocdla/salesforce/SalesforceRestApi.js";


export default class JobSearch extends Component {
  useMock = USE_MOCK_RECORDS;

  record;

  recordId;

  constructor(recordId) {
    super();
    this.recordId = recordId;
    this.actions = ["delete"];
    this.jobList = new JobList();
    this.jobList.fullWidth = false;
    this.jobDetails = new JobDetails(this.recordId);
    this.api = new SalesforceRestApi(INSTANCE_URL, ACCESS_TOKEN);
  }

  async onRequestDelete(dataset) {
    let id = dataset.id;
    let resp = await this.api.delete("Job__c", id);
    console.log(resp);

    if(resp.ok || resp == true) {
      const e = new CustomEvent("rerender", { detail: this });
      document.dispatchEvent(e);
    }
    else
    {
      window.alert("An error occurred while deleting the record.");
    }
  }

  render() {
  
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-4 hidden">
            {this.jobList.render()}
          </div>
          <div class="col-8 biggen">
            {this.jobDetails.render()}
          </div>
        </div>
      </div>
    );
  }

  async loadData() {
    await this.jobList.loadData();
    await this.jobDetails.loadData();
  }
}