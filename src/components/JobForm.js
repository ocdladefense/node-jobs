/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import SalesforceRestApi from "@ocdla/salesforce/SalesforceRestApi.js";
import Job from "@ocdla/employment/Job.js";
import {RecordList} from "@ocdla/employment/Job.js";
import FileUpload from "./FileUpload.js";
import Component from "./Component.js";
import { error } from "toastr";



export default class JobForm extends Component {
  useMock = USE_MOCK_RECORDS;

  static actions = ["save", "delete", "cancel"];

  record;

  recordId;

  constructor(recordId) {
    super();
    this.api = new SalesforceRestApi(INSTANCE_URL, ACCESS_TOKEN);
    this.recordId = recordId;
  }

  async loadData() {
    if (this.useMock) {
      let records = await Job.getMockData();
      let list = new RecordList(records);
      this.record = list.getRecord(this.recordId);
    } else {
      let resp = await this.api.query(
        "SELECT Id, Name, Salary__c, PostingDate__c, ClosingDate__c, FileUrl__c, Employer__c, Location__c, OpenUntilFilled__c FROM Job__c WHERE Id = '" +
          this.recordId +
          "'"
      );
      let list = new RecordList(resp.records);
      this.record = list.getRecord(this.recordId);
    }
  }

  // --- end of crud -----
  listenTo(event) {
    let elem = document.querySelector("#job-container");
    elem.addEventListener(event, this);
  }

  getFormData() {
    let formEl = document.getElementById("record-form");
    let formData = new FormData(formEl);

    return Job.fromFormData(formData);
  }

  async handleEvent(e) {
    // When an error occurs, the message will be displayed to the user.
    // But then, what do we want to happen?  Do go back to the list if there an error?
    // Or do we stay on the page and display the error message?
    // Also validations errors - we obbserved that the error message is displayed, but the form is still submitted.
    let target = e.target;
    let dataset = target.dataset;
    let action = target.dataset.action;
    let record;
    let message = "";
    let method;
    let error = false;

    if (dataset == null || action == null) {
      return false;
    }
    e.preventDefault();

    if (!JobForm.actions.includes(action)) {
      return false;
    }

    method = "onRequest" + this.toTitleCase(action);

    record = this.getFormData();
    record = record.toSObject();


    try {
      this[method](record);
      message = "The action was completed successfully.";
    }
    catch(e) {
      console.log(e, method);
      message = e.message;
      error = true;
    }


    window.alert(message);


    // For forms, don't move on to the next page if there was an error.
    if(error) return false;

    window.location.assign("#");
    window.location.reload();
    // If everything okay, redirect to # (pound)
  }


  async onRequestCancel() {

    if (window.confirm("Really leave this page?  Any unsaved changes will be lost.")) {
      window.location.assign("#");
    } else {
      return false;
    }
  }

  async onRequestDelete(Id) {
    let resp = await this.api.delete("Job__c", Id);
    return resp;
  }

  async onRequestSave(record) {
    if (!!record.Id) {
      await this.updateRecord(record);
    } else {
      await this.createRecord(record);
    }
    message = "The record was saved.";
  }


  // ---- CRUD methods ------
  async createRecord(record) {
    delete record.Id;
    let resp = await this.api.create("Job__c", record);
    return resp;
  }

  async updateRecord(record) {
    let resp = await this.api.update("Job__c", record);
    return resp;
  }




  render() {
    let job = this.record;

    return (
      <form id="record-form">
        <div class="mb-3">
          <label for="title" class="form-label">
            Job Title
          </label>
          <input
            id="title"
            name="title"
            class="form-control"
            aria-describedby="title-help"
            placeholder="Enter Job Title"
            value={job.title}
          />
          <div id="title-help" class="form-text fs-6">
            The title of the job position (insert data constraints here).
          </div>
        </div>
        <div>
          <input value={job.id} name="id" id="id" hidden />
        </div>
        <div class="mb-3">
          <label for="employer" class="form-label">
            Employer
          </label>
          <input
            id="employer"
            name="employer"
            class="form-control"
            aria-describedby="employer-help"
            placeholder="Enter the Employer"
            value={job.employer}
          />
          <div id="employer-help" class="form-text fs-6">
            The name of the Employer (insert data constraints here).
          </div>
        </div>

        <div class="mb-3">
          <label for="salary" class="form-label">
            Salary
          </label>
          <input
            id="salary"
            name="salary"
            class="form-control"
            aria-describedby="salary-help"
            placeholder="Enter the Salary"
            value={job.salary}
          />
          <div id="salary-help" class="form-text fs-6">
            The compensation information for the position (insert data
            constraints here).
          </div>
        </div>

        <div class="mb-3">
          <label for="location" class="form-label">
            Location
          </label>
          <input
            id="location"
            name="location"
            class="form-control"
            aria-describedby="location-help"
            placeholder="Enter the Location"
            value={job.location}
          />
          <div id="location-help" class="form-text fs-6">
            The location where the job will take place (insert data constraints
            here).
          </div>
        </div>

        <div class="mb-3">
          <label for="date-posted" class="form-label">
            Date Posted
          </label>
          <input
            id="date-posted"
            name="posting-date"
            class="form-control"
            type="date"
            aria-describedby="date-posted-help"
            placeholder={job.datePosted}
            value={job.datePosted}
          />
          <div id="date-posted-help" class="form-text fs-6">
            The date job was posted (this will be automatic eventually).
          </div>
        </div>

        <div class="mb-3">
          <label for="date-closing" class="form-label">
            Date Closing
          </label>
          <input
            id="date-closing"
            name="closing-date"
            class="form-control"
            type="date"
            aria-describedby="date-closing-help"
            placeholder={job.dateClosing}
            value={job.dateClosing}
          />
          <div id="date-closing-help" class="form-text fs-6">
            The date that the job posting will close, if any (enter data
            constraints here).
          </div>
        </div>

        <FileUpload url={job.fileUrl} />

        <div class="mb-3">
          <div class="input-group">
            <label for="open-until-filled" class="form-label">
              Open until filled?
            </label>
            {job.openUntilFilled ? (
              <input
                id="open-until-filled"
                name="open-until-filled"
                class="form-input m-2"
                type="checkbox"
                checked
                aria-describedby="checkbox-help"
              />
            ) : (
              <input
                id="open-until-filled"
                class="form-input m-2"
                type="checkbox"
                aria-describedby="checkbox-help"
              />
            )}
          </div>
          <div
            id="checkbox-help"
            name="open-until-filled"
            class="form-text fs-6"
          >
            Whether or not the job posting closes once it is filled.
          </div>
        </div>

        <button type="submit" href="#" data-action="save" value="Save">
          Save
        </button>
        {job.id == "" ? (
          ""
        ) : (
          <input type="submit" data-action="delete" value="Delete" />
        )}
        {/* <a href="#" type="button" value="Cancel" >Cancel</a> */}
        <button type="button" value="Cancel" data-action="cancel">
          Cancel
        </button>
      </form>
    );
  }
}