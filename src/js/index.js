import "../css/text-design.css";
import "../css/card-design.css";
import "../css/form-design.css";
import Router from "./Router.js";
import HttpClient from "@ocdla/lib-http/HttpClient.js";
import SalesforceRecordsMock from "./SalesforceRecordsMock.js";
// add inline comment's

let usemock = USE_MOCK_RECORDS;
// Checks to see if we want to use the mock records.
if(usemock)
{
HttpClient.register(INSTANCE_URL, new SalesforceRecordsMock());
}
// Initialize router to handle URL requests.
let router = new Router("#job-container");

// Listen for changes in the URL hash (the part of the URL after the # symbol).
router.listenTo("hashchange");

// Renders the intial veiw based on the current URL hash.
router.render();
