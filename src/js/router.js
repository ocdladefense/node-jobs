/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import JobForm from "../components/JobForm.js";
import JobList from "../components/JobList.js";
import Details from "../components/Details.js";
import Job from "../../node_modules/@ocdla/employment/Job.js";

export default class Router {

    static validHashes = [];
    static actions = ["create", "save", "edit", "delete", "cancel"];

    constructor(selector) {
        this.selector = selector;
        this.view = View.createRoot(this.selector);
    }

    async render() {        
        let hash = window.location.hash;
        let tree;

        if (hash == "") {
            let c = new JobList();
            c.listenTo("click");
            await c.loadData();
            tree = c.render();
            this.view.render(tree);
        } else if (hash == "#new") { 
            let job = new Job();
            let jobForm = new JobForm(job);
            jobForm.listenTo("click");
            tree = jobForm.render();
            this.view.render(tree);
        } else if (hash == "#details") {
            let details = new Details();
            tree = details.render();
            this.view.render(tree);
        }

        //this.view.render(tree);
    }

    listenTo(event) {
        window.addEventListener(event, this);
      }

    handleEvent(e) {
        console.log("hash has changed");
        this.render();
    }
}

