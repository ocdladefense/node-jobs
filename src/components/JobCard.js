/** @jsx vNode */

import {vNode, View} from "@ocdla/view";

const JobCard = function(props) {
    let job = props.job;

    
    return (
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col">
                <div class="card mb-3">
                    <div class="card-header text-white bg-dark mb-3">{job.title}</div>
                        <div class="card-body text-dark">
                            <p class="card-text">
                                <strong>Employer:</strong> {job.employer} <br />
                                <strong>Salary:</strong> {job.salary} <br />
                                <strong>Location:</strong> {job.location} <br />
                                <strong>Date Posted:</strong> {job.postingDate} <br />
                                <strong>Date Closing:</strong> {job.closingDate} <br />
                                <strong>Open until filled:</strong> {job.openUntilFilled ? 'Yes' : 'No'}<br />
                            </p>
                        </div>
                        <div class="card-footer">
                            <a href={`#edit?id=${job.id}`} class="btn btn-secondary" data-id={job.id} data-action="edit">Edit</a>
                            <a href="#" class="btn btn-secondary" data-id={job.id} data-action="delete">Delete</a>
                        </div>
                </div>
            </div>
        </div>
    )
    
};

export default JobCard;
