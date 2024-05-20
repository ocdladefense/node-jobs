/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import SalesforceRestApi from "@ocdla/salesforce/SalesforceRestApi.js";
import Job from "@ocdla/employment/Job.js";
import FileUpload from "./FileUpload.js";

/*
let fileUrl = "https://mydomain.com/catpic";


const FileUpload = function(props) {
    let multipleFilesEnabled = false;
    let fileUrl = props.url;

    return (
        <div class="mb-3">
          <label for="file-upload" class="form-label">Upload Files</label>
          <div class="input-group">
            {fileUrl != "" ? (
              <span>{fileUrl}</span>
            ) : (<input type="file" class="form-control-file" id="file-upload" value={fileUrl} aria-describedby="file-upload-help" name="file-upload" />)}
            <input type="button" value="Remove File" />
            {multipleFilesEnabled ? (<input type="button" value="Add File" />) : ("")} 
          </div>
          <div id="file-upload-help" class="form-text fs-6">Any files relevant to the position (insert data constraints here).</div>
        </div>    
    );
};


const JobForm = function(props) {
    let job = props.job;

    return (
      <form id="record-form" class="needs-validation">
        <div class="mb-3">
          <label for="title" class="form-label">Job Title</label>
          <input id="title"  class="form-control" type="text" aria-describedby="title-help"
            name="title"
            placeholder="Enter Job Title" 
            value={job.jobTitle}
            required />
          <div id="title-help" class="form-text fs-6 valid-feedback invalid-feedback">The title of the job position (insert data constraints here).</div>
        </div>

        <input  id="id"  value={job.id} type="hidden"/>

        <div class="mb-3">
          <label for="employer" class="form-label">Employer</label>
          <input id="employer"  class="form-control" type="text" aria-describedby="employer-help"
            name="employer"
            placeholder="Enter the Employer"
            value={job.employer} />
          <div id="employer-help" class="form-text fs-6 valid-feedback invalid-feedback">The name of the Employer (insert data constraints here).</div>
        </div>

        <div class="mb-3">
          <label for="salary" class="form-label">Salary</label>
          <input id="salary"  class="form-control" type="text" aria-describedby="salary-help"
            salary="salary"
            placeholder="Enter the Salary" 
            value={job.salary} />
          <div id="salary-help" class="form-text fs-6 valid-feedback invalid-feedback">The compensation information for the position (insert data constraints here).</div>
        </div>

        <div class="mb-3">
          <label for="location" class="form-label">Location</label>
          <input id="location"  class="form-control" type="text" aria-describedby="location-help"
            name="location"
            placeholder="Enter the Location"
            value={job.location} />
          <div id="location-help" class="form-text fs-6 valid-feedback invalid-feedback">The location where the job will take place (insert data constraints here).</div>
        </div>

        <div class="mb-3">
        <label for="date-posted" class="form-label">Date Posted</label>
        <input id="date-posted"  class="form-control" type="date" aria-describedby="date-posted-help"
          placeholder={job.datePosted}
          value={job.datePosted} />
        <div id="date-posted-help" class="form-text fs-6 valid-feedback invalid-feedback">The date job was posted (this will be automatic eventually).</div>
        </div>

        <div class="mb-3">
          <label for="date-closing" class="form-label">Date Closing</label>
          <input id="date-closing"  class="form-control" type="date" aria-describedby="date-closing-help"
            placeholder={job.dateClosing}  
            value={job.dateClosing}/>
          <div id="date-closing-help" class="form-text fs-6 valid-feedback invalid-feedback">The date that the job posting will close, if any (enter data constraints here).</div>
        </div>

        {/* <FileUpload url={job.fileUrl} /> */}

        <div class="mb-3">
          <div class="input-group">
            <label for="open-until-filled" class="form-label">Open until filled?</label>
            {job.openUntilFilled ? (
              <input id="open-until-filled"  class="form-input m-2" type="checkbox" checked aria-describedby="checkbox-help" name="open-until-filled" />
            ) : (
              <input id="open-until-filled"  class="form-input m-2" type="checkbox" aria-describedby="checkbox-help" name="open-until-filled" />
            )}
          </div>
          <div id="checkbox-help" class="form-text fs-6 valid-feedback invalid-feedback">Whether or not the job posting closes once it is filled.</div>
        </div>


        <button type="submit" href="#save" value="Save">Save</button>
        {job.id == "" ? ("") :(<button type="delete" href="#delete" value="Delete">Delete</button>)}
        <a href="#" value="Cancel">Cancel</a>
      </form>
    );
};

export default JobForm;
*/

export default class JobForm {
  useMock = USE_MOCK_RECORDS;

  static actions = ["save", "delete", "cancel"];

  constructor(job) {
    this.api = new SalesforceRestApi(INSTANCE_URL, ACCESS_TOKEN);
    this.job = job;
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

    // if (["save"].includes(action)) {
    //   job = this.getFormData();
    // } 

    if(!JobForm.actions.includes(action)) {
      return;
    }

    job = this.getFormData();

    if (action == "cancel") {
      if(window.confirm("Are you sure?")) { window.location.assign("#"); }
    }

    if (action == "delete") {
      this.deleteJob();
      window.location.assign("#specifications");
    }

    // if (!!job.Id) {
    //   await this.updateJob(job);
    // } else {
    //   await this.createJob(job);
    // }

    // If everything okay, redirect to # (pound)
  }

  async createJob(job) {
    await this.api.create("Job__c", job);
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

  render() {
    let job = this.job;

    return (
      <form id="record-form">
        
        <div class="mb-3">
          <label for="title" class="form-label">Job Title</label>
          <input id="title"  class="form-control" aria-describedby="title-help"
            placeholder="Enter Job Title" 
            value={job.jobTitle} />
          <div id="title-help" class="form-text fs-6">The title of the job position (insert data constraints here).</div>
        </div>

        <div class="mb-3">
          <label for="employer" class="form-label">Employer</label>
          <input id="employer"  class="form-control" aria-describedby="employer-help"
            placeholder="Enter the Employer"
            value={job.employer} />
          <div id="employer-help" class="form-text fs-6">The name of the Employer (insert data constraints here).</div>
        </div>

        <div class="mb-3">
          <label for="salary" class="form-label">Salary</label>
          <input id="salary"  class="form-control" aria-describedby="salary-help"
            placeholder="Enter the Salary" 
            value={job.salary} />
          <div id="salary-help" class="form-text fs-6">The compensation information for the position (insert data constraints here).</div>
        </div>

        <div class="mb-3">
          <label for="location" class="form-label">Location</label>
          <input id="location"  class="form-control" aria-describedby="location-help"
            placeholder="Enter the Location"
            value={job.location} />
          <div id="location-help" class="form-text fs-6">The location where the job will take place (insert data constraints here).</div>
        </div>

        <div class="mb-3">
        <label for="date-posted" class="form-label">Date Posted</label>
        <input id="date-posted"  class="form-control" type="date" aria-describedby="date-posted-help"
          placeholder={job.datePosted}
          value={job.datePosted} />
        <div id="date-posted-help" class="form-text fs-6">The date job was posted (this will be automatic eventually).</div>
        </div>

        <div class="mb-3">
          <label for="date-closing" class="form-label">Date Closing</label>
          <input id="date-closing"  class="form-control" type="date" aria-describedby="date-closing-help"
            placeholder={job.dateClosing}  
            value={job.dateClosing}/>
          <div id="date-closing-help" class="form-text fs-6">The date that the job posting will close, if any (enter data constraints here).</div>
        </div>

        <FileUpload url={job.fileUrl} />

        <div class="mb-3">
          <div class="input-group">
            <label for="open-until-filled" class="form-label">Open until filled?</label>
            {job.openUntilFilled ? (
              <input id="open-until-filled"  class="form-input m-2" type="checkbox" checked aria-describedby="checkbox-help" />
            ) : (
              <input id="open-until-filled"  class="form-input m-2" type="checkbox" aria-describedby="checkbox-help" />
            )}
          </div>
          <div id="checkbox-help" class="form-text fs-6">Whether or not the job posting closes once it is filled.</div>
        </div>

        <input type="submit" data-action="save" value="Save" />
        {job.id == "" ? ("") :(<input type="submit" data-action="delete" value="Delete" />)}
        {/* <a href="#" type="button" value="Cancel" >Cancel</a> */}
        <button type="button" value="Cancel" data-action="cancel">Cancel</button>
      </form>
    );
  }
}