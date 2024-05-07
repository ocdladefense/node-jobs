/** @jsx vNode */

import {vNode, View} from "@ocdla/view";



let fileUrl = "https://mydomain.com/catpic";


const FileUpload = function(props) {
    let file;
    if (props != null) {
        file = props.file;
    }

    return (
        <div class="form-group">
            <label for="fileUpload">Upload Files:</label><br />
                
            <input type="file" class="form-control-file" id="fileUpload" />
            <input type="button" value="Remove File" />
            <input type="button" value="Add File" /><br />

        </div>
    );
};


const JobForm = function(props) {
  let job = props.job;
  let update = !!job.id;

  return (
        <form>
            <div class="form-group">
                <label for="title">Job Title:</label>
                <input id="title" class="form-control" placeholder="Enter Job Title" value={job.title} />
            </div>
        
            <div class="form-group">
                <label for="employer">Employer:</label>
                <input id="employer" class="form-control" placeholder="Enter the employer" value={job.employer} />
            </div>
        
            <div class="form-group">
                <label for="salary">Salary:</label>
                <input id="salary" class="form-control" placeholder="Enter the Salary" value={job.salary} />
            </div>
        
            <div class="form-group">
                <label for="location">Location:</label>
                <input id="location" class="form-control" placeholder="Enter the Location" />
            </div>
        
            <div class="form-group">
                <label for="datePosted">Date Posted:</label>
                <input id="datePosted" class="form-control" placeholder="MM/DD/YYYY" value={job.employer} />
            </div>
        
            <div class="form-group">
                <label for="dateClosing">Date Closing:</label>
                <input id="dateClosing" class="form-control" placeholder="MM/DD/YYYY" value={job.employer} />
            </div>
        
            <FileUpload url={fileUrl} />
        
            <div class="form-check">
                <input id="openUntilFilled" class="form-check-input" type="checkbox" checked />
                <label class="form-check-label" for="openUntilFilled">Open until filled?</label>
            </div>
        
            <button type="submit" class="btn btn-secondary" data-action="save">Save</button>
            <button type="submit" class="btn btn-secondary" data-action="delete">Delete</button>
            <button type="button" class="btn btn-secondary" data-action="cancel">Cancel</button>
        </form>
    );
};

export default JobForm;