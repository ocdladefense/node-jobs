import "../css/text-design.css";
import "../css/card-design.css";
import Router from "./Router.js";
import HttpClient from "@ocdla/lib-http/HttpClient.js";
import SalesforceRecordsMock from "./SalesforceRecordsMock.js";

HttpClient.register(INSTANCE_URL, new SalesforceRecordsMock());
let router = new Router("#job-container");
router.listenTo("hashchange");
router.render();
