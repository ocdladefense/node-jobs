import "../css/text-design.css";
import Controller from "./controller";


let controller = new Controller("#job-container");
//controller.listenTo("click");
await controller.getJobs();
controller.render();



