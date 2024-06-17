/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import Component from "./Component.js";
import JobList from "../components/JobList.js";
import JobDetails from "../components/JobDetails.js";

export default class JobSearch extends Component {
  useMock = USE_MOCK_RECORDS;

  record;

  recordId;

  constructor(recordId) {
    super();
    this.recordId = recordId;
    this.actions = [];
    this.jobList = new JobList();
    this.jobList.fullWidth = false;
    this.jobDetails = new JobDetails(this.recordId);
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