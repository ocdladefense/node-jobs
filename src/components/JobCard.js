/** @jsx vNode */

import {vNode, View} from "@ocdla/view";

const JobCard = function(props) {
    let job = props.job;

    
    return (
        <div class="card">
            <div class="card-header text-white bg-dark mb-3">{job.jobTitle}</div>
            <div class="card-body text-dark">
                <p class="card-text">
                    <strong>Employer:</strong> {job.employer} <br />
                    <strong>Salary:</strong> {job.salary} <br />
                    <strong>Location:</strong> {job.location} <br />
                    <strong>Date Posted:</strong> {job.datePosted} <br />
                    <strong>Date Closing:</strong> {job.dateClosing} <br />
                    <strong>Open until filled:</strong> {job.openUntilFilled ? 'Yes' : 'No'}<br />
                </p>
            </div>
            <div class="card-footer">
                <a href="#" class="btn btn-secondary" data-id={job.id} data-action="edit">Edit</a>
                <a href="#" class="btn btn-secondary" data-id={job.id} data-action="delete">Delete</a>
            </div>
        </div>
    )
    
};

export default JobCard;
