/** @jsx vNode */

import {vNode, View} from "@ocdla/view";

//we need three jobs to work with, prolly gon store in array

let fileUrl = "https://mydomain.com/catpic";

//Note: THIS COMPONENT IS NOT FINISHED/CHECKED YET
const FileUpload = function(props) {
    let file = props.file;
    let enableMultipleFiles = false;

    return (
        <div class="form-group">
            <label for="fileUploadController">Example file input</label>
                
            <input type="file" class="form-control-file" id="fileUploadController" />
            {enableMultipleFiles ? (
                <input type="btn" class="" name="removeFile"/>
            ) : (
                <div />
            )}

            <input type="btn" class="" name="addFile"/>
        </div>
    );
};

/*
const JobPostingForm = function(props) {
    let job = props.job;
    let update = job.Id != null;
    return (
        <form>
            <label for="jobTitle">Job Title</label>
            {update ? (
                <input id="jobTitle" value={job.jobTitle}/>
            ) : (
                <input id="jobTitle" value="Enter here"/>
            )}
            
            <label for="salary">Salary</label>
            {update ? (
                <input id="salary" value={job.salary}/>
            ) : (
                <input id="salary" value="Enter here"/>
            )}

            <label for="datePosted">Date Posted</label>
            {update ? (
                <input id="datePosted" value={job.datePosted}/>
            ) : (
                <input id="datePosted" value="Enter here"/>
            )}

            <label for="employer">Employer</label>
            {update ? (
                <input id="employer" value={job.employer}/>
            ) : (
                <input id="employer" value="Enter here"/>
            )}

            <label for="fileUpload">File Upload</label>
            {update ? (
                <input id="fileUpload" type="file" value={job.FileUpload} />
            ) : (
                <input id="fileUpload" type="file"/>
            )}
        </form>
    );
};
*/

const JobPostingForm = function(props) {
    let job = props.job;
    let update = job.Id != null;
    return (
        <div class="container">
            <form>
                <div class="row">
                    <div class="col">
                        <label for="jobTitle">Job Title</label>
                        {update ? (
                            <input id="jobTitle" value={job.jobTitle} class="form-control"/>
                        ) : (
                            <input id="jobTitle" placeholder="Enter Job Title" class="form-control"/>
                        )}
                    </div>
                    <div class="col">
                        <label for="employer">Employer</label>
                        {update ? (
                            <input id="employer" value={job.employer} class="form-control"/>
                        ) : (
                            <input id="employer" placeholder="Enter the Employer" class="form-control"/>
                        )}
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label for="salary">Salary</label>
                        {update ? (
                            <input id="salary" value={job.salary} class="form-control"/>
                        ) : (
                            <input id="salary" placeholder="Enter the Salary" class="form-control"/>
                        )}
                    </div>
                    <div class="col">
                        <label for="location">Location</label>
                        {update ? (
                            <input id="location" value={job.location} class="form-control"/>
                        ) : (
                            <input id="location" placeholder="Enter the Location" class="form-control"/>
                        )}
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label for="datePosted">Posting Date</label>
                        {update ? (
                            <input id="datePosted" value={job.datePosted} class="form-control"/>
                        ) : (
                            <input id="datePosted" type="date" class="form-control"/>
                        )}
                    </div>
                    <div class="col">
                        <label for="closingDate">Closing Date</label>
                        {update ? (
                            <input id="closingDate" value={job.closingDate} class="form-control"/>
                        ) : (
                            <input id="closingDate" type="date" class="form-control"/>
                        )}
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label for="fileUpload">Upload Files</label>
                        {update ? (
                            <input id="fileUpload" type="file" value={job.fileUpload} class="form-control"/>
                        ) : (
                            <input id="fileUpload" type="file" class="form-control"/>
                        )}
                    </div>
                    <div class="col">
                        <label for="openUntilFilled">Open until filled?</label>
                        <input id="openUntilFilled" type="checkbox" class="form-control"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <a href="./index.html">
                            <input type="button" value="Cancel" class="btn btn-primary"/>
                        </a>
                        <input type="submit" value="Save" class="btn btn-primary"/>
                    </div>
                </div>
            </form>
        </div>
    );
};

let theData = {
    jobTitle: "Attorney",
    salary: "$1,000,000,000",
    datePosted: "4/3/2024",
    fileUrl: "https://mydomain.com/catpic",
    employer: "ACME Lawyers Inc."
}

window.onload = () => {
    let theJob = Job.newFromJSON(theData);
    const view = View.createRoot("#root");
    console.log(theJob);
    view.render(<JobPostingForm job={theJob}/>);
}

export {JobPostingForm};