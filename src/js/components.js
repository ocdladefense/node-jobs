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

            <label for="fileUpload">File Upload</label>
            {/* <FileUpload></FileUpload> */}

            <label for="employer">Employer</label>
            {update ? (
                <input id="employer" value={job.employer}/>
            ) : (
                <input id="employer" value="Enter here"/>
            )}
        </form>
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