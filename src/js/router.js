/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import JobForm from "../components/JobForm.js";
import JobList from "../components/JobList.js";
import JobDetails from "../components/JobDetails.js";
import { parseHash } from "../components/Component.js";
import JobSearch from "../components/JobSearch.js";
/**
 * Represents a router class that manages the rendering of components based on the URL hash.
 */
export default class Router {

    static validHashes = [];

    currentComponent;


    /**
     * Creates an instance of Router.
     * @constructor
     * @param {string} selector - The selector to create the root view.
     */
    constructor(selector) {
        this.selector = selector;
        this.view = View.createRoot(this.selector);
    }

    /**
     * Renders the appropriate component based on the current hash in the URL.
     * @async
     * @function render
     * @returns void
    */
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

        let recordId = params.id;

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

        if (c.loadData) {
            await c.loadData();
        }
        tree = c.render();

        this.view.render(tree);
        this.currentComponent = c;
    }
   
    listenTo(event) {
        window.addEventListener(event, this);
        document.addEventListener("rerender", this);    
    }

    /**
     * Handles events and triggers a rerender of the router.
     * @async
     * @param {event} e 
     */
    async handleEvent(e) {
        await this.render();
    }

}

