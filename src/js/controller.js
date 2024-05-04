import API from "@ocdla/salesforce/SalesforceRestApi";
import JobPostingForm from '../components/JobPostingForm.js';
import JobList from '../components/JobList.js';
import Job from '../../node_modules/@ocdla/employment/Job.js';

import { vNode, View } from "@ocdla/view";

/** @jsx vNode */


class Controller {
    records;
    useMock = USE_MOCK_RECORDS;

    constructor(selector) {

        this.api = new API(INSTANCE_URL, ACCESS_TOKEN);
        this.selector = selector;
        this.view = View.createRoot(this.selector);
        //this.view.render(<JobPostingForm job={theJob[i]} />)
        //this.view.render(<JobPostinglist jobs={theJobs} />)
        //this.getJobs();
    }

    async getMockData() {
        let j1 = Job.newFromJSON({
            ownerId: "0",
            id: "0",
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
            ownerId: "1",
            id: "1",
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
            ownerId: "2",
            id: "2",
            jobTitle: "Justice Architect",
            salary: "$96,000",
            datePosted: "4/17/2024",
            dateClosing: "6/1/2024",
            fileUrl: "https://a-domain.law/justice-architect",
            employer: "Liberty Legal Associates",
            location: "Haborview Bay",
            openUntilFilled: false
        })
        
        let mockJobs = [j1, j2, j3];

        return Promise.resolve(mockJobs);
    }
    


    getUserInput(id) {
        let elem = document.getElementById(id);
        return elem.value;
    }


    listenTo(event) {
        let elem = document.querySelector(this.selector);
        elem.addEventListener(event, this);
    }

    getFormData() {
        let jobName = this.getUserInput("name");

        let employer = this.getUserInput("employer");

        let id = this.getUserInput("id");

        let salary = parseInt(this.getUserInput("salary"));

        let date = "2024-04-29";

        let job = {
            "Name": jobName,
            "DatePosted__c": date,
            "Employer__c": employer,
            "Salary__c": salary,
            "Id": id,
        };
        return job;
    }

    handleEvent(e) {
        let target = e.target;

        let action = target.dataset.action;

        //let job = this.getFormData();

        if (action == "save") {
            if (!!job.Id) {
                this.updateJob(job);
            }
            else {
                this.createJob(job);
            }
        }

        if(action == "edit"){
            let id = target.dataset.id;
            let selectedJob = this.records[0];
            this.view.update(<JobPostingForm job={selectedJob} />);
        }

        if (action == "delete") {
            this.deleteJob(job.Id);
            
            this.view.update(<JobList jobs={theJobs} message="your posing was succesfully deleted" ownerId={USER_ID}/>);
        }

        if(action == "cancel"){
            this.view.update(<JobList jobs={theJobs} ownerId={USER_ID}/>);
        }

    }
    
    async getJobs() {
        if (this.useMock) {
            this.records = await this.getMockData();
        } else {
            let request = await this.api.query("SELECT name, id,datePosted__c,employer__c,fileURL__c, salary__c  from jobs__c");
            this.records = request.records;
        }

    }

    render(){
        this.view.render(<JobList jobs={this.records} ownerId={USER_ID}/>);
    }


    async createJob(job) {

        await this.api.create("jobs__c", job);
    }


    async updateJob(job) {
        let temp = await this.api.update("jobs__c", job);
        if (temp == true) {
            this.view.update(<JobList jobs={theJobs} message="your posting was succesfully updated" ownerId={USER_ID}/>);
        }
        //this.getapi();
    }


    async deleteJob(id) {
        let target = {
            "Id": id
        }
        await this.api.delete("jobs__c", target);
    }


}


export default Controller;