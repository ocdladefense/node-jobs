/** @jsx vNode */

import {vNode, View} from "@ocdla/view";
import JobCard from './JobPostingCard.js';

const JobList = function(props) {
    let jobs = props.jobs;
    let ownerId = props.ownerId;

    return (
        <div class="job-list">
            {jobs.map(job => <JobCard job={job} isOwner={job.isOwner(ownerId)} />)} 
        </div>
    );
};

export default JobList;
