/** @jsx vNode */

import {vNode, View} from "@ocdla/view";
import JobCard from './JobCard.js';

const JobList = function(props) {
    let jobs = props.jobs;
    let ownerId = props.ownerId;

    return (
        <div class="list-group">
            {jobs.map(job => <JobCard job={job} isOwner={job.isOwner(ownerId)} />)} 
        </div>
    );
};

export default JobList;
