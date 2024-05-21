/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import SalesforceRestApi from "@ocdla/salesforce/SalesforceRestApi.js";
import Job from "@ocdla/employment/Job.js";
import FileUpload from "./FileUpload.js";


export default class JobForm {
  useMock = USE_MOCK_RECORDS;

  static actions = ["save", "delete", "cancel"];

  constructor(jobId) {
    this.api = new SalesforceRestApi(INSTANCE_URL, ACCESS_TOKEN);
    this.jobId = jobId;
    if (jobId == null) {
      this.record = new Job();
    }
  }

  loadData() {
    /*
    if job has id, load data
    else, give it a new job
    */
  }

  getUserInput(id) {
    let elem = document.getElementById(id);
    return elem.value;
  }

  getFormData() {
    let formEl = document.getElementById("record-form");
    let formData = new FormData(formEl);

    let job = Job.fromFormData(formData);

    return job.toSObject();
  }

  async handleEvent(e) {
    let target = e.target;
    let dataset = target.dataset;
    let action = target.dataset.action;
    let job;

    if (dataset == null || action == null) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    // if (["save"].includes(action)) {
    //   job = this.getFormData();
    // } 

    if (!JobForm.actions.includes(action)) {
      return;
    }


    if (action == "cancel") {
      if (window.confirm("Are you sure?")) { window.location.assign("#"); }
    }

    if (action == "delete") {
      this.deleteJob();
      window.location.assign("");
      return;
    }
    job = this.getFormData();

    if (action == "save") {
      try {
        let isValid = this.validateSubmission();

        if (!isValid) {
          console.log("form was not valid!");
          return; //stops the page from going back to the joblist, allowing the user to see the error messages
        }  

        if (!!job.Id) {
          await this.updateJob(job);
        } else {
          await this.createJob(job);
        }
      }
      catch (e) {
        console.log(e, method);

        window.alert(e.message);
      }
    }
    window.location.assign("");
    // If everything okay, redirect to # (pound)
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  async createJob(job) {
    
    job.OpenUntilFilled__c = job.OpenUntilFilled__c  == null ? true : job.openUntilFilled;// temp code needed 
    //job.IsActive__c = true;
    let resp = await this.api.create("Job__c", job);
    return resp;
  }

  async updateJob(job) {
    let temp = await this.api.update("Job__c", job);
    if (temp == true) {
      window.alert("Your posting was successfully updated");
    }
  }

  listenTo(event) {
    let elem = document.querySelector("#job-container");
    elem.addEventListener(event, this);
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
    let job = this.job;

    return (
      <form id="record-form" class="needs-validation" novalidate>
        
        <input name="id" type="hidden" value={job.id}/>
        <input name="ownerId" type="hidden" value={job.ownerId}/>

        <div class="mb-3">
          <label for="title"  class="form-label">Job Title</label>
          <input id="title" name="title" class="form-control" aria-describedby="title-help" 
            placeholder="Enter Job Title"
            value={job.jobTitle} 
            required />
          <div id="title-help" class="form-text fs-6">The title of the job position.</div>
          <div class="invalid-feedback form-text fs-6">Job title is required!</div>
        </div>

        <div class="mb-3">
          <label for="employer" class="form-label">Employer</label>
          <input id="employer" name="employer" class="form-control" aria-describedby="employer-help"
            placeholder="Enter the Employer"
            value={job.employer} 
            required />
          <div id="employer-help" class="form-text fs-6">The name of the Employer (insert data constraints here).</div>
          <div class="invalid-feedback form-text fs-6"></div>
        </div>

        <div class="mb-3">
          <label for="salary" class="form-label">Salary</label>
          <input id="salary" name="salary" class="form-control" aria-describedby="salary-help"
            placeholder="Enter the Salary"
            value={job.salary} 
            required />
          <div id="salary-help" class="form-text fs-6">The compensation information for the position (insert data constraints here).</div>
          <div class="invalid-feedback form-text fs-6"></div>
        </div>

        <div class="mb-3">
          <label for="location" class="form-label">Location</label>
          <input id="location" name="location" class="form-control" aria-describedby="location-help"
            placeholder="Enter the Location"
            value={job.location} 
            required />
          <div id="location-help" class="form-text fs-6">The location where the job will take place (insert data constraints here).</div>
          <div class="invalid-feedback form-text fs-6"></div>
        </div>

        <div class="mb-3">
          <label for="posting-date" class="form-label">Date Posted</label>
          <input id="posting-date" name="posting-date" class="form-control" type="date" aria-describedby="posting-date-help"
            placeholder="Enter today's date."
            value={job.postingDate} />
          <div id="posting-date-help" class="form-text fs-6">The date job was posted (this will be automatic eventually).</div>
          <div class="invalid-feedback form-text fs-6"></div>
        </div>

        <div class="mb-3">
          <label for="closing-date" class="form-label">Date Closing</label>
          <input id="closing-date" name="closing-date" class="form-control" type="date" aria-describedby="closing-date-help"
            placeholder="Enter the closing date, we suggest 30 days from today."
            value={job.closingDate} 
            required />
          <div id="closing-date-help" class="form-text fs-6">The date that the job posting will close, if any (enter data constraints here).</div>
          <div class="invalid-feedback form-text fs-6"></div>
        </div>

        <FileUpload url={job.fileUrl} />

        <div class="mb-3">
          <div class="input-group">
            <label for="open-until-filled" class="form-label">Open until filled?</label>
            {job.openUntilFilled ? (
              <input id="open-until-filled" class="form-input m-2" type="checkbox" checked aria-describedby="checkbox-help" />
            ) : (
              <input id="open-until-filled" class="form-input m-2" type="checkbox" aria-describedby="checkbox-help" />
            )}
          </div>
          <div id="checkbox-help" name="open-until-filled" class="form-text fs-6">Whether or not the job posting closes once it is filled.</div>
          <div class="invalid-feedback form-text fs-6"></div>
        </div>

        <button type="submit" href="#save" data-action="save" value="Save">Save</button>
        {job.id == "" || job.id == undefined ? ("") : (<input type="submit" data-action="delete" value="Delete" />)}
        <button type="button" value="Cancel" data-action="cancel">Cancel</button>
      </form>
    );
  }
}