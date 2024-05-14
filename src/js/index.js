import "../css/text-design.css";
import Router from "./router";

let router = new Router("#job-container");
router.listenTo("hashchange");
router.render();

//let controller = new Controller("#job-container");
//controller.listenTo("click");
//await controller.getJobs();
//controller.render();
