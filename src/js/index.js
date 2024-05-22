import "../css/text-design.css";
import "../css/card-design.css";

import Router from "./Router";

let router = new Router("#job-container");
router.listenTo("hashchange");
router.render();
