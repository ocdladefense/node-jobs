import "../css/text-design.css";
import Router from "./router";
let router = new Router("#job-container");
router.listenTo("hashchange");
router.render();
