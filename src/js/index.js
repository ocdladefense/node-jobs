import "../css/text-design.css";
import "../css/card-design.css";
import "../css/form-design.css";
import Router from "./Router.js";
import HttpClient from "@ocdla/lib-http/HttpClient.js";
import SalesforceRecordsMock from "./SalesforceRecordsMock.js";
import colloquial from "@ocdla/lib-date/DateConvert.js";
import jsonData from '../../data/Job__c.json';

if(USE_MOCK_RECORDS) {
    HttpClient.register(INSTANCE_URL, new SalesforceRecordsMock(jsonData));
}

let router = new Router("#job-container");
router.listenTo("hashchange");
router.render();