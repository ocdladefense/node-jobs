/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import JobForm from "../components/JobForm.js";
import JobList from "../components/JobList.js";
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
            //c.listenTo("click");
            //c.setupEventHandlers();
            await c.loadData();
            tree = c.render();
            this.view.render(tree);
        } else if (hash == "#new") { 
            let job = new Job();
            tree = <JobForm job={job}/>;
            this.view.render(tree);
        } else if (hash == "#save") {
            let isValid = this.validateSubmission();
            if (!isValid) {
                console.log("form was not valid!");
                //rerender the page with the error messages
                let form = document.getElementById("record-form");
                tree = form;
                this.view.update(tree);
            } else {
                let c = new JobList();
                await c.loadData();
                tree = c.render();
                this.view.render(tree);
            }
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

