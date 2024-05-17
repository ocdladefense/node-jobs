/** @jsx vNode */

import {vNode, View} from "@ocdla/view";
import JobCard from './JobCard.js';


const JobList = function(props) {
    let jobs = props.jobs;
    let ownerId = props.ownerId;
    let message = props.error || props.message || "";

    return (
        <div>
            <div style="color:red;" class="error">{message}</div>
            <button type="button" id="button" data-action="create">Create a Job Posting</button>
            <div class="list-group">
                {jobs.map(job => <JobCard job={job} isOwner={job.isOwner(ownerId)} />)} 
            </div>
        </div>
    );
};


export default JobList;
