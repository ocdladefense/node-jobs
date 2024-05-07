import "../css/text-design.css";
import Controller from "./controller";

let controller = new Controller("#job-container");

//note: since the "Create a new Posting" button is not a part of the job-container, 
//these two lines are part of a quick fix to get it to open an empty form for testing purposes.
let newPostingBtn = document.getElementById("create");
newPostingBtn.addEventListener("click", controller);

controller.listenTo("click");
await controller.getJobs();
controller.render();
