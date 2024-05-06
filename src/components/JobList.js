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
        <div class="job-list">
            {jobs.map(job => <JobCard job={job} isOwner={true} />)} 
        </div>
    );
};

export default JobList;
