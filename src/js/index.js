import "../css/text-design.css";
import Controller from "./controller";


let controller = new Controller("#root");
controller.listenTo("click");
await controller.getJobs();
controller.render();
