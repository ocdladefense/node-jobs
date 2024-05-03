/** @jsx vNode */

import {vNode, View} from "@ocdla/view";
import JobCard from './JobPostingCard.js';

const JobList = function(props) {
    let jobs = props.jobs;

    return (
        <div class="job-list">
            {jobs.map(job => <JobCard job={job} />)}
        </div>
    );
};

export default JobList;
