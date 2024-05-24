/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import Component from "./Component.js";
import JobList from "../components/JobList.js";
import JobDetails from "../components/JobDetails.js";
import "../css/job-search-design.css";

export default class JobSearch extends Component {
  useMock = USE_MOCK_RECORDS;

  record;

  recordId;

  constructor(recordId) {
    super();
    this.recordId = recordId;
    this.actions = [];
    this.jobList = new JobList();
    this.jobDetails = new JobDetails(this.recordId);
  }

  render() {
  
    return (
      <div class="container">
        <div class="stickyexample">
          {this.jobDetails.render()}
        </div>
        <div class="container-fluid">
          {this.jobList.render()}
        </div>
      </div>
    );
  }

  async loadData() {
    await this.jobList.loadData();
    await this.jobDetails.loadData();
  }
}