import API from "@ocdla/salesforce/SalesforceRestApi"
import { JobPostingForm } from './components.js'
import { vNode, View } from "@ocdla/view";

/** @jsx vNode */


class Controller {
    records;

    constructor(selector) {

        this.api = new API(INSTANCE_URL, ACCESS_TOKEN);
        this.selector = selector;
        this.view = View.createRoot(this.selector);
        //this.view.render(<JobPostingForm job={theJob[i]} />)
        //this.view.render(<JobPostinglist jobs={theJobs} />)
        this.getJobs();
    }


    


    getUserInput(id) {
        let elem = document.getElementById(id);
        return elem.value;
    }


    listenTo(event) {
        let elem = document.querySelector(this.selector);
        elem.addEventListener(event, this);
    }


    handleEvent(e) {
        let target = e.target;

        let action = target.dataset.action;

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
            let selectedJob = "search through recrods for the job";
            this.view.update(<JobPostingForm job={selectedJob} />)
        }

        if (action == "delete") {
            this.deleteJob(job.Id);
            
            this.view.update(<JobPostingList jobs={theJobs} message="your posing was succesfully deleted" />);
        }

        if(action == "cancel"){
            this.view.update(<JobPostingList jobs={theJobs} />);
        }

    }
    
    async getJobs() {
        let request = await this.api.query("SELECT name, id,datePosted__c,employer__c,fileURL__c, salary__c  from jobs__c");
        this.records = request.records;

    }

    render(){
        //this.view.render(<JobPostingList jobs={this.records} />);
    }


    async createJob(job) {

        await this.api.create("jobs__c", job);
    }


    async updateJob(job) {
        let temp = await this.api.update("jobs__c", job);
        if (temp == true) {
            this.view.update(<JobPostingList jobs={theJobs} message="your posing was succesfully updated" />);
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