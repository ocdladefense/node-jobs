/** @jsx vNode */

import {vNode, View} from "@ocdla/view";



let fileUrl = "https://mydomain.com/catpic";


const FileUpload = function(props) {
    let multipleFilesEnabled = false;
    let fileUrl = props.url;

    return (
        <div class="form-group">
          <label for="fileUpload" class="form-label">Upload Files</label>
          <div class="input-group">
            <input type="file" class="form-control-file" id="fileUpload" value={fileUrl}/>
            <input type="button" value="Remove File" />
            {multipleFilesEnabled ? (<input type="button" value="Add File" />) : ("")}
          </div>
        </div>    
    );
};



const JobForm = function(props) {
    let job = props.job;

    return (
      <form>
        <div class="mb-3">
          <label for="title" class="form-label">Job Title</label>
          <input id="title"  class="form-control"
            placeholder="Enter Job Title" 
            value={job.jobTitle} />
        </div>

        <div class="mb-3">
          <label for="employer" class="form-label">Employer</label>
          <input id="employer"  class="form-control"
            placeholder="Enter the employer"
            value={job.employer} />
        </div>

        <div class="mb-3">
          <label for="salary" class="form-label">Salary</label>
          <input id="salary"  class="form-control"
            placeholder="Enter the Salary" 
            value={job.salary} />
        </div>

        <div class="mb-3">
          <label for="location" class="form-label">Location</label>
          <input id="location"  class="form-control"
            placeholder="Enter the Location"
            value={job.location} />
        </div>

        <div class="mb-3">
        <label for="date-posted" class="form-label">Date Posted</label>
        <input id="date-posted"  class="form-control" type="date"
          placeholder={job.datePosted}
          value={job.datePosted} />
        </div>

        <div class="mb-3">
          <label for="date-closing" class="form-label">Date Closing</label>
          <input id="date-closing"  class="form-control" type="date"
            placeholder={job.dateClosing}
            value={job.dateClosing}/>
        </div>

        <FileUpload url={job.fileUrl} />

        <div class="mb-3 ">
          <label for="open-until-filled" class="form-label">Open until filled?</label>
          {job.openUntilFilled ? (
            <input id="open-until-filled"  class="form-input" type="checkbox" checked/>
          ) : (
            <input id="open-until-filled"  class="form-input" type="checkbox" />
          )}
        </div>


        <input type="submit" data-action="save" value="Save" />
        <input type="submit" data-action="delete" value="Delete" />
        <input type="button" data-action="cancel" value="Cancel" />
      </form>
    );
};

export default JobForm;