/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import JobForm from "../components/JobForm.js";
import JobList from "../components/JobList.js";
import JobDetails from "../components/JobDetails.js";

export default class Router {

    static validHashes = [];

    currentComponent;



    constructor(selector) {
        this.selector = selector;
        this.view = View.createRoot(this.selector);
    }

    async render() {        
        let hash = window.location.hash;
        let tree;
        let c;

        let elem = document.querySelector("#job-container");
        if(elem) {
           elem.removeEventListener("click", this.currentComponent);
        }

        let recordId = this.getRecordId();

        if (hash == "" || hash == "#") {
            this.currentComponent = c = new JobList();
        }
        else if (hash == "#new") { 
            this.currentComponent = c = new JobForm();
        } 
        else if (hash.startsWith("#edit")){
            this.currentComponent = c = new JobForm(recordId);
        } 
        else if (hash == "#details") {
            this.currentComponent = c = new JobDetails();
        }

        c.listenTo("click", "#job-container");

        if (c.loadData) {
            await c.loadData();
        }
        tree = c.render();

        this.view.render(tree);
    }
    
    getRecordId() {
        let hash = window.location.hash;
        const urlParams = new URLSearchParams(hash.substring(hash.indexOf('?')));
        const jobId = urlParams.get('id');
    
        return jobId;
    }

    listenTo(event) {
        window.addEventListener(event, this);
        document.addEventListener("rerender", this);    
    }


    async handleEvent(e) {
        //console.log("hash has changed");
        await this.render();
    }
}

