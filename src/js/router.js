/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import JobForm from "../components/JobForm.js";
import JobList from "../components/JobList.js";
import JobDetails from "../components/JobDetails.js";
import { urlHash } from "../components/Component.js";
import JobSearch from "../components/JobSearch.js";

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
            c = new JobList();
        }
        else if (hash == "#new") { 
            c = new JobForm();
        } 
        else if (hash.startsWith("#edit")){
            c = new JobForm(recordId);
        } 
        else if (hash.startsWith("#details")) {
            c = new JobSearch(recordId);
        }

        c.listenTo("click", "#job-container");

        if (c.loadData) {
            await c.loadData();
        }
        tree = c.render();

        this.view.render(tree);
        this.currentComponent = c;
    }
    
    getRecordId() {
        let hash = window.location.hash;
        const urlParams = new URLSearchParams(hash.substring(hash.indexOf('?')));
        const jobId = urlParams.get('id');
    
        return jobId;
    }

    listenTo(event) {
        window.addEventListener(event, this);
    }

    handleEvent(e) {
        //console.log("hash has changed");
        this.render();
    }
}

