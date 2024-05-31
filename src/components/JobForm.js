/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import SalesforceRestApi from "@ocdla/salesforce/SalesforceRestApi.js";
import Job from "@ocdla/employment/Job.js";
import { RecordList } from "@ocdla/employment/Job.js";
import FileUpload from "./FileUpload.js";
import Component from "./Component.js";
// import "../css/form-design.css";

export default class JobForm extends Component {
  recordId;

  record;

  message;

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
    let type = e.type; // click or submit

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
    } catch (e) {
      console.log(e, method);
      this.message = e.message;
      error = true;
    }

    window.alert(this.message);

    // For forms, don't move on to the next page if there was an error.
    if (error) return false;

    window.location.assign("#");
  }

  async uploadFile(file, jobName) {
    // Create a new FormData instance
    const formData = new FormData();

    // Append the file and job name to the FormData instance
    formData.append("files", file);
    formData.append("jobName", jobName);

    // Send a POST request to the server
    const response = await fetch('http://localhost:5500/uploads', {
        method: 'POST',
        body: formData,
    });

    // Parse the JSON response
    const data = await response.json();

    // Log the response data
    console.log(data);
  }

  async onRequestCancel() {
    if (
      window.confirm(
        "Really leave this page?  Any unsaved changes will be lost."
      )
    ) {
      window.location.assign("#");
    } else {
      return false;
    }
  }

  async onRequestDelete(recordId) {
    let resp = await this.api.delete("Job__c", recordId);
    return resp;
  }

  getFileInput(id) {
    // Get the file input element by its ID
    let elem = document.getElementById(id);
    // Get the label element to display the file name
    let fileNameLabel = document.getElementById("file-name");

    // Add an event listener for the 'change' event on the file input element
    elem.addEventListener("change", (event) => {
      "";
      // Log the first file selected by the user
      console.log(event.target.files[0]);
      // Update the text content of the label with the name of the selected file
      fileNameLabel.textContent = event.target.files[0].name;
    });
    // Return the first file selected by the user
    return elem.files[0];
  }

  getFirstFile(id) {
    // Get the file input element by its ID
    let elem = document.getElementById(id);
    // Return the first file selected by the user
    return elem.files[0];
  }

  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file

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
      // If record does not have an ID, create record
      // Save the form data
      let response = await this.createRecord(record);

      // If the job was successfully created, then the file is uploaded
      if (response) {
        let file = this.getFirstFile("file-upload"); // Retrieves and returns the first file selected by the user
        let jobName = record.Name; // Use Job name field to rename the file that's going to be uploaded
        await this.uploadFile(file, jobName); // Calls the uploadFile method with the file obtained from the first line as an argument
      }
      this.message = "The record was saved.";
    }
  }

  // ---- CRUD methods ------
  async createRecord(record) {
    delete record.Id;
    record.OpenUntilFilled__c =
      record.OpenUntilFilled__c == "on" ? true : false;
    let resp = await this.api.create("Job__c", record);
    return resp;
  }

  async updateRecord(record) {
    record.OpenUntilFilled__c =
      record.OpenUntilFilled__c == "on" ? true : false;
    let resp = await this.api.update("Job__c", record);
    return resp;
  }

  validateSubmission() {
    // 'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission
    for (let i = 0; i < forms.length; i++) {
      let form = forms[i];
      let validity = form.checkValidity();
      form.classList.add("was-validated");

      return validity;
    }
  }

  render() {
    let job = this.record;

    return (
      <div class="form-container">
        <form
          id="record-form"
          method="post"
          class="needs-validation"
          novalidate
        >
          <input name="id" type="hidden" value={job.id} />
          <input name="ownerId" type="hidden" value={job.ownerId} />

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

          <div class="item-container">
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
              required
            />
            <div id="employer-help" class="form-text fs-6">
              The name of the Employer (insert data constraints here).
            </div>
            <div class="invalid-feedback form-text fs-6"></div>
          </div>

          <div class="item-container">
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
              required
            />
            <div id="salary-help" class="form-text fs-6">
              The compensation information for the position (insert data
              constraints here).
            </div>
            <div class="invalid-feedback form-text fs-6"></div>
          </div>

          <div class="item-container">
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
              required
            />
            <div id="location-help" class="form-text fs-6">
              The location where the job will take place (insert data
              constraints here).
            </div>
            <div class="invalid-feedback form-text fs-6"></div>
          </div>

          <div class="item-container">
            <label for="posting-date" class="form-label">
              Date Posted
            </label>
            <input
              id="posting-date"
              name="posting-date"
              class="form-control"
              type="date"
              aria-describedby="posting-date-help"
              placeholder="Enter today's date."
              value={job.postingDate}
            />
            <div id="posting-date-help" class="form-text fs-6">
              The date job was posted (this will be automatic eventually).
            </div>
            <div class="invalid-feedback form-text fs-6"></div>
          </div>

          <div class="item-container">
            <label for="closing-date" class="form-label">
              Date Closing
            </label>
            <input
              id="closing-date"
              name="closing-date"
              class="form-control"
              type="date"
              aria-describedby="closing-date-help"
              placeholder="Enter the closing date, we suggest 30 days from today."
              value={job.closingDate}
              required
            />
            <div id="closing-date-help" class="form-text fs-6">
              The date that the job posting will close, if any (enter data
              constraints here).
            </div>
            <div class="invalid-feedback form-text fs-6"></div>
          </div>

          <FileUpload url={job.fileUrl} />

          <div class="item-container">
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
            <div class="invalid-feedback form-text fs-6"></div>
          </div>

          <button type="submit" data-action="save" value="Save">
            Save
          </button>
          {job.id == "" || job.id == undefined ? (
            ""
          ) : (
            <input type="submit" data-action="delete" value="Delete" />
          )}
          <button type="button" value="Cancel" data-action="cancel">
            Cancel
          </button>
        </form>
      </div>
    );
  }
}
