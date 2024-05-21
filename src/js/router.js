/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import JobForm from "../components/JobForm.js";
import JobList from "../components/JobList.js";
import Job from "../../node_modules/@ocdla/employment/Job.js";

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

        if (hash == "" || hash == "#") {
            this.currentComponent = c = new JobList();
            c.listenTo("click");
            await c.loadData();
            tree = c.render();
        }
        else if (hash == "#new") { 
            let job = new Job();
            this.currentComponent = c = new JobForm(job);
            c.listenTo("click");
            await c.loadData();
            tree = c.render();
        } 
        else if (hash.startsWith("#edit")){
            let recordId = this.getRecordId();
            this.currentComponent = c = new JobForm(recordId);
            c.listenTo("click");
            await c.loadData();
            tree = c.render();
        }

        this.view.render(tree);
    }
    getRecordId() {
        let hash = window.location.hash;
        const urlParams = new URLSearchParams(hash.substring(hash.indexOf('?')));
        const jobId = urlParams.get('id');
    
        return jobId;
    }
    listenTo(event) {
        //let elem = document.querySelector(this.selector);
        window.addEventListener(event, this);
      }

    handleEvent(e) {
        //console.log("hash has changed");
        this.render();
    }

    
}