/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import JobForm from "../components/JobForm.js";
import JobList from "../components/JobList.js";
import Job from "../../node_modules/@ocdla/employment/Job.js";

export default class Router {

    static validHashes = [];

    constructor(selector) {
        this.selector = selector;
        this.view = View.createRoot(this.selector);
    }

    async render() {        
        let hash = window.location.hash;
        let tree;

        if (hash == "") {
            let c = new JobList();
            //c.listenTo("click");
            await c.loadData();
            tree = c.render();
        } else if (hash == "#new") { 
            let job = new Job();
            tree = <JobForm job={job}/>;
        } 

        this.view.render(tree);
    }

    listenTo(event) {
        //let elem = document.querySelector(this.selector);
        window.addEventListener(event, this);
      }

    handleEvent(e) {
        console.log("hash has changed");
        this.render();
    }

    
}