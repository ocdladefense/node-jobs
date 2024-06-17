/** @jsx vNode */

import {vNode, View} from "@ocdla/view";
import { urlHash } from "../components/Component.js";
import colloquial from "@ocdla/lib-date/DateConvert.js";

const JobCard = function(props) {
    let job = props.job;
    let admin = props.isOwner;

    return (
        <div class="grid-item">
            <div class="header">
                <h1>{job.title}</h1>
            </div>
            <p>
                <span class="text-secondary">{job.employer} - {job.location}</span> <br />
                <strong>Salary:</strong> {job.salary} <br /> <hr />
                <div class="text">{job.description}</div>
            </p>
            <div class="footer">
                
                <a href={`#details!id=${job.id}`} class="btn btn-secondary" data-id={job.id}>View Details</a>
        
                {admin && (
                    <span class="validation">
                        <a href={`#edit!id=${job.id}`} class="btn btn-secondary">Edit</a>
                        <a href="#" class="btn btn-secondary" data-id={job.id} data-action="delete">Delete</a>
                    </span>
                )}
            <br /> 
            <span class="text-secondary">Posted {colloquial(job.postingDate)} (Closed {colloquial(job.closingDate)}) </span>
            </div>
        </div>
    );
};

export default JobCard;
