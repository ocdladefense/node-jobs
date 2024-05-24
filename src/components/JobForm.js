/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import SalesforceRestApi from "@ocdla/salesforce/SalesforceRestApi.js";
import Job from "@ocdla/employment/Job.js";
import {RecordList} from "@ocdla/employment/Job.js";
import FileUpload from "./FileUpload.js";
import Component from "./Component.js";



export default class JobForm extends Component {
  useMock = USE_MOCK_RECORDS;

  record;
  message;
  recordId;

  constructor(recordId) {
    super();
    this.api = new SalesforceRestApi(INSTANCE_URL, ACCESS_TOKEN);
    this.recordId = recordId;
    this.actions = ["save", "delete", "cancel"];
  }

  async loadData() {
    if (this.recordId == null) {
      this.record = new Job();
      return;
    }

    let resp = await this.api.query(
      "SELECT OwnerId, Id, Name, Salary__c, PostingDate__c, ClosingDate__c, AttachmentUrl__c, Employer__c, Location__c, OpenUntilFilled__c FROM Job__c WHERE Id = '" +
        this.recordId +
        "'"
    );
    let list = new RecordList(resp.records);
    let record = list.getRecord(this.recordId);
    this.record = Job.fromSObject(record);
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
    let method;
    let error = false;

    if (dataset == null || action == null) {
      return false;
    }
    e.preventDefault();
    e.stopPropagation();

    if (!this.actions.includes(action)) {
      return false;
    }

    method = "onRequest" + this.toTitleCase(action);

    record = this.getFormData();
    record = record.toSObject();


    try {
      await this[method](record);
      this.message = "The action was completed successfully.";
    }
    catch(e) {
      console.log(e, method);
      message = e.message;
      error = true;
    }

    window.alert(this.message);

    // For forms, don't move on to the next page if there was an error.
    if(error) return false;

    window.location.assign("#");
  }


  async onRequestCancel() {

    if (window.confirm("Really leave this page?  Any unsaved changes will be lost.")) {
      window.location.assign("#");
    } else {
      return false;
    }
  }



  async onRequestDelete(recordId) {
    let resp = await this.api.delete("Job__c", recordId);
    return resp;
  }



  async onRequestSave(dataset) {
    let isValid = this.validateSubmission();
    if (!isValid) {
      throw new Error("There are errors in your form.");
    }

    let record = this.getFormData();
    record = record.toSObject();

    if (!!record.Id) {
      await this.updateRecord(record);
    } else {
      await this.createRecord(record);
    }
    this.message = "The record was saved.";
  }



  // ---- CRUD methods ------
  async createRecord(record) {
    delete record.Id;
    record.OpenUntilFilled__c = record.OpenUntilFilled__c == "on" ? true : false;
    let resp = await this.api.create("Job__c", record);
    return resp;
  }



  async updateRecord(record) {
    record.OpenUntilFilled__c = record.OpenUntilFilled__c == "on" ? true : false;
    let resp = await this.api.update("Job__c", record);
    return resp;
  }

  

  validateSubmission() {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    for (let i = 0; i < forms.length; i++) {
        let form = forms[i];
        let validity = form.checkValidity();
        form.classList.add('was-validated')
        return validity;
    }
  }


  render() {
    let job = this.record;

    return (
      <form id="record-form" class="needs-validation" novalidate>
        
        <input name="id" type="hidden" value={job.id}/>
        <input name="ownerId" type="hidden" value={job.ownerId}/>

        <div class="mb-3">
          <label for="title"  class="form-label">
            Job Title
          </label>
          <input 
            id="title" 
            name="title" 
            class="form-control" 
            aria-describedby="title-help" 
            placeholder="Enter Job Title"
            value={job.title} 
            required />
          <div id="title-help" class="form-text fs-6">The title of the job position.</div>
          <div class="invalid-feedback form-text fs-6">Job title is required!</div>
        </div>

        <div class="mb-3">
          <label for="description"  class="form-label">
            Job Description
          </label>
          <textarea 
            id="description" 
            name="description" 
            rows="10"
            cols="20"
            class="form-control" 
            aria-describedby="description-help" 
            required>
              {job.description == "" || job.description == undefined ? ("Enter a description here") : (job.description)}
            </textarea>
          <div id="description-help" class="form-text fs-6">The description of the job position.</div>
          <div class="invalid-feedback form-text fs-6">Job description is required!</div>
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
            required />
          <div id="employer-help" class="form-text fs-6">The name of the Employer (insert data constraints here).</div>
          <div class="invalid-feedback form-text fs-6">Employer is required!</div>
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
            required />
          <div id="salary-help" class="form-text fs-6">The compensation information for the position (insert data constraints here).</div>
          <div class="invalid-feedback form-text fs-6">Salary is required!</div>
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
            required />
          <div id="location-help" class="form-text fs-6">The location where the job will take place (insert data constraints here).</div>
          <div class="invalid-feedback form-text fs-6">Location is required!</div>
        </div>

        <div class="mb-3">
          <label for="posting-date" class="form-label">Date Posted</label>
          <input id="posting-date" name="posting-date" class="form-control" type="date" aria-describedby="posting-date-help"
            placeholder="Enter today's date."
            value={job.postingDate} />
          <div id="posting-date-help" class="form-text fs-6">The date job was posted.</div>
          <div class="invalid-feedback form-text fs-6">Date Posted is required!</div>
        </div> 

        <div class="mb-3">
          <label for="closing-date" class="form-label">Date Closing</label>
          <input id="closing-date" name="closing-date" class="form-control" type="date" aria-describedby="closing-date-help"
            placeholder="Enter the closing date, we suggest 30 days from today."
            value={job.closingDate} 
            required />
          <div id="closing-date-help" class="form-text fs-6">The date that the job posting will close, if any (enter data constraints here).</div>
          <div class="invalid-feedback form-text fs-6">Date Closing is required!</div>
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
          <div id="checkbox-help" name="open-until-filled" class="form-text fs-6">Whether or not the job posting closes once it is filled.</div>
          <div class="invalid-feedback form-text fs-6"></div>
        </div>

        <button type="submit" href="#save" data-action="save" value="Save">Save</button>
        {job.id == "" || job.id == undefined ? ("") : (<input type="submit" data-action="delete" value="Delete" />)}
        <button type="button" value="Cancel" data-action="cancel">
          Cancel
        </button>
      </form>
    );
  }
}