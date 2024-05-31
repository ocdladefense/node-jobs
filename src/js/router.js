/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import JobForm from "../components/JobForm.js";
import JobList from "../components/JobList.js";
import JobDetails from "../components/JobDetails.js";
import { parseHash } from "../components/Component.js";
import JobSearch from "../components/JobSearch.js";

export default class Router {

    static validHashes = [];

    currentComponent;



    constructor(selector) {
        this.selector = selector;
        this.view = View.createRoot(this.selector);
    }

    async render() {        
        let hash;
        let params;
        [hash, params] = parseHash(window.location.hash);
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
        else if (hash.startsWith("#search")) {
            c = new JobSearch(recordId);
        }
        else if (hash.startsWith("#details")) {
            c = new JobDetails(recordId);
        }

        c.listenTo("click", "#job-container");
        /*
        Listen for submit events
        c.listenTo("submit", "#record-form");
        */

        if (c.loadData) {
            await c.loadData();
        }
        tree = c.render();

        this.view.render(tree);
        this.currentComponent = c;
    }
    
    getRecordId() {
        let route;
        let params;


        let hash = window.location.hash;
        [route, params] = parseHash(hash);
    
        return params.id;
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

