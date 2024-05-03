/** @jsx vNode */

import {vNode, View} from "@ocdla/view";

const JobCard = function(props) {
    let job = props.job;
    /*
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
    */
   return (
    <div class="job-card">
        <div class="card-header">{job.jobTitle}</div>
        <div class="card-body text-dark">
            <p class="card-text">
                <strong>Employer:</strong> {job.employer} <br />
                <strong>Salary:</strong> {job.salary} <br />
                <strong>Location:</strong> {job.location} <br />
                <strong>Date Posted:</strong> {job.datePosted} <br />
                <strong>Date Closing:</strong> {job.dateClosing} <br />
                <strong>Open until filled:</strong> {job.openUntilFilled ? 'Yes' : 'No'}<br />
            </p>
            <div class="card-footer">
                <a href="#" data-id={job.id} data-action="edit">Edit</a>
                <a href="#" data-id={job.id} data-action="delete">Delete</a>
            </div>
        </div>
    </div>
   )
};

export default JobCard;
