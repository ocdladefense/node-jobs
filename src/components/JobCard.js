/** @jsx vNode */

import {vNode, View} from "@ocdla/view";

const JobCard = function(props) {
    let job = props.job;
    let admin = props.isOwner;

    return (
        <div class="grid-container">
            <div class="grid-item">
                <div class="header">
                    <h1>{job.title}</h1>
                </div>
                <p>
                    <strong>Employer:</strong> {job.employer} <br />
                    <strong>Salary:</strong> {job.salary} <br />
                    <strong>Location:</strong> {job.location} <br />
                    <strong>Date Posted:</strong> {job.postingDate} <br />
                    <strong>Date Closing:</strong> {job.closingDate} <br />
                    <strong>Open until filled:</strong> {job.openUntilFilled ? 'Yes' : 'No'}<br />
                </p>
                <div class="footer">
                    <a href="#details" class="button" data-id={job.id}>View Details</a>
                    {admin && (
                        <div class="validation">
                            <a href={`#edit?id=${job.id}`} class="button">Edit</a>
                            <a href="#" class="button" data-id={job.id} data-action="delete">Delete</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobCard;
