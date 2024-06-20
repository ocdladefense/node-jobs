import "../css/text-design.css";
import "../css/card-design.css";
import "../css/form-design.css";
import mockData from "../data/Job__c.json";
import Router from "./Router.js";
import HttpClient from "@ocdla/lib-http/HttpClient.js";
import SalesforceRecordsMock from "./SalesforceRecordsMock.js";
import colloquial from "@ocdla/lib-date/DateConvert.js";

// Colloquial function testing...
// If today's date is May 31, 2024 then:
console.log(colloquial("2024-05-28")); //returns "3 days ago";
console.log(colloquial("2024-05-29")); //returns "2 days ago".
console.log(colloquial("2024-05-30")); //returns "yesterday".
console.log(colloquial("2024-05-31")); // Returns "today".
console.log(colloquial("2024-06-01")); //returns "tomorrow"
console.log(colloquial("2024-06-02")); //returns "in 2 days";
console.log(colloquial("2024-06-03")); //returns "in 3 days";


if(USE_MOCK_RECORDS) {
    HttpClient.register(INSTANCE_URL, new SalesforceRecordsMock(mockData.records));
}

let router = new Router("#job-container");
router.listenTo("hashchange");
router.render();