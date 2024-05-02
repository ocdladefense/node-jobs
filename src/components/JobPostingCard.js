/** @jsx vNode */

import {vNode, View} from "@ocdla/view";

const JobCard = function(props) {
    let job = props.job;

    return (
        <div class="job-card">
            <h2>{job.jobTitle}</h2>
            <p><strong>Employer:</strong> {job.employer}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Date Posted:</strong> {job.datePosted}</p>
            <p><strong>Date Closing:</strong> {job.dateClosing}</p>
            <p><strong>Open until filled:</strong> {job.openUntilFilled ? 'Yes' : 'No'}</p>
        </div>
    );
};

export default JobCard;
