import API from "@ocdla/salesforce/SalesforceRestApi"
import { JobPostingForm } from './components.js'
import { vNode, View } from "@ocdla/view";

/** @jsx vNode */


class Controller {

    constructor(selector) {

        this.api = new API(INSTANCE_URL, ACCESS_TOKEN);
        this.selector = selector;
        //this.view = View.createRoot(this.selector);
        //this.view.render(<JobPostingForm job={theJob[i]} />)
        this.view.render(<JobPostinglist jobs={theJobs} />)
    }


    async render(elem) {
        let theJob = await this.getJobs();
        console.log(theJob);
        for (let i = 0; i < theJob.length; i++) {
            let html = View.createElement(<JobPostingForm job={theJob[i]} />);
            document.getElementById(elem).appendChild(html);
        }
        this.addEventHandlers(elem)
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
            if (job.Id != null) {
                this.updateJob(job);
            }
            else {
                this.createJob(job);
            }
        }

        if(action == "edit"){
            this.view.update(<JobPostingForm job={theJob[i]} />)
        }

        if (action == "delete") {
            this.deleteJob(job.Id);
            
            this.view.update(<JobPostingList jobs={theJobs} message="your posing was succesfully " />);
        }

        if(action == "cancel"){
            this.view.update(<JobPostingList jobs={theJobs} />);
        }

    }

    async getJobs() {
        let request = await this.api.query("SELECT name, id,datePosted__c,employer__c,fileURL__c, salary__c  from jobs__c");
        let records = request.records;
        return records;

    }


    async createJob(job) {

        await this.api.create("jobs__c", job);
    }


    async updateJob(job) {
        let temp = await this.api.update("jobs__c", job);
        console.log(temp)
        if (temp == true) {
            window.alert("it worked!!!!")
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