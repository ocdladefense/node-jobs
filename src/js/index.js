/** @jsx vNode */

import {vNode, View} from "@ocdla/view";
import Controller from "./controller.js";
import JobPostingForm from "../components/JobPostingForm.js";
import "../css/text-design.css";
import Job from "../../dev_modules/@ocdla/employment/Job.js";


let controller = new Controller();

let j1 = Job.newFromJSON({
    jobTitle: "Legal Maverick",
    salary: "$80,000",
    datePosted: "4/20/2024",
    dateClosing: "5/29/2024",
    fileUrl: "https://my-domain.com/document1",
    employer: "Veritas Law Group",
    location: "Rivertown Junction",
    openUntilFilled: false
})

let j2 = Job.newFromJSON({
    jobTitle: "Trial Whisperer",
    salary: "$110,000",
    datePosted: "4/28/2024",
    dateClosing: "5/10/2024",
    fileUrl: "https:/this-domain.org/documents/requirements",
    employer: "JusticeShield Attorneys",
    location: "Cedarwood Heights",
    openUntilFilled: true
})

let j3 = Job.newFromJSON({
    jobTitle: "Justice Architect",
    salary: "$96,000",
    datePosted: "4/17/2024",
    dateClosing: "6/1/2024",
    fileUrl: "https://a-domain.law/justice-architect",
    employer: "Liberty Legal Associates",
    location: "Haborview Bay",
    openUntilFilled: false
})

j1.Id = 0;
j2.Id = 1;
j3.Id = 2;

let mockJobs = [];
mockJobs.push(j1);
mockJobs.push(j2);
mockJobs.push(j3);

window.onload = () => {
    const view = View.createRoot("#jobform");
    view.render(<JobPostingForm job={mockJobs[2]}/>);
}