/** @jsx vNode */

import {vNode, View} from "@ocdla/view";
import JobCard from './JobCard.js';
function isOwner(ownerId){
    return true;
}

const JobList = function(props) {
    let jobs = props.jobs;
    let ownerId = props.ownerId;

    return (
        <div>
            <button type="button" id="button" data-action="new">Create a Job Posting</button>
            <div class="list-group">
                {jobs.map(job => <JobCard job={job} isOwner={job.isOwner(ownerId)} />)} 
            </div>
        </div>
    );
};


export default JobList;
