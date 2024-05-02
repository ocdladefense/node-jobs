/** @jsx vNode */

import {vNode, View} from "@ocdla/view";

//we need three jobs to work with, prolly gon store in array

let fileUrl = "https://mydomain.com/catpic";

//Note: THIS COMPONENT IS NOT FINISHED/CHECKED YET
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

const JobPostingForm = function(props=null) {
    let job;
    let update = false;
    if (props != null) {
        job = props.job;
        update = job.Id != null;
    }
    return (
        <form>
            <label for="jobTitle">Job Title:</label><br />
            {update == true ? (
                <input id="jobTitle" placeholder={job.jobTitle}/>
            ) : (
                <input id="jobTitle" placeholder="Enter Job Title"/>
            )}<br />

            <label for="employer">Employer:</label><br />
            {update ? (
                <input id="employer" placeholder={job.employer}/>
            ) : (
                <input id="employer" placeholder="Enter the Employer"/>
            )}<br />
            
            <label for="salary">Salary:</label><br />
            {update ? (
                <input id="salary" placeholder={job.salary}/>
            ) : (
                <input id="salary" placeholder="Enter the Salary"/>
            )}<br />

            <label>Location:</label><br />
            {update ? (
                <input id="location" placeholder={job.location} />
            ) : (
                <input id="location" placeholder="Enter the Location"/> 
            )}<br />

            <label for="datePosted">Date Posted:</label><br />
            {update ? (
                <input id="datePosted" placeholder={job.datePosted}/>
            ) : (
                <input id="datePosted" placeholder="Enter here"/>
            )}<br />

            <label for="dateClosing">Date Closing:</label><br />
            {update ? (
                <input id="dateClosing" placeholder={job.dateClosing}/>
            ) : (
                <input id="dateClosing" placeholder="Enter here"/>
            )}<br />

            <FileUpload />
            
            <label>Open until filled?</label>
            {update ? (
                job.openUntilFilled ? (
                    <input type="checkbox" checked/>
                ) : (
                    <input type="checkbox"/>
                )
            ) : (
                <input id="openUntilFilled" type="checkbox"/>
            )}<br />

            <a href="./index.html">
                <input type="button" value="Cancel"/>
            </a>
            <input type="submit" value="Save"></input>
        </form>
    );
};

export default JobPostingForm;