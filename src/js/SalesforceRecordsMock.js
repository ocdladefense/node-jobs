import HttpMock from "@ocdla/lib-http/HttpMock";
import SObjectList from "@ocdla/salesforce/SObjectList";
import Url from "@ocdla/lib-http/Url";

export default class SalesforceJobMock extends HttpMock {

  #list;


  constructor() {
    super();

    let tmp = [];

    SalesforceJobMock.records.records.forEach((record) => {
      tmp.push([record.Id, record]);
    });

    this.list = new Map(tmp);
  }


  getResponse(req) {

    let url = new Url(req.url);

    if (req.method === "GET") {
      return Response.json({ "records": Array.from(this.list.values()) });
    }
    else if (req.method == "DELETE") {
      let recordId = url.getLastPathSegment();
      this.deleteRecord(recordId);

      return new Response(null, { status: 204 });
    }
    else if (req.method == "POST") {

    }
    else if (req.method == "PATCH") {
      let recordId = url.getLastPathSegment();
    }
  }

  deleteRecord(recordId) {

    this.list.delete(recordId);
  }
  // these are f
  addRecord(recordId, job) {
    this.list.push(recordId,job);
  }
  updateRecord(recordId,job) {

    let record = this.list.find(recordId);
    if(record) {
      record.job = job;
    }

  }


  static records = {
    records: [
      {
        OwnerId: "0",
        Id: "0",
        Name: "Legal Maverick",
        Salary__c: "$80,000",
        PostingDate__c: "2024-04-20",
        ClosingDate__c: "2024-05-29",
        FileUrl__c: "https://my-domain.com/document1",
        Employer__c: "Veritas Law Group",
        Location__c: "Rivertown Junction",
        OpneUntilFilled__c: false,
      },
      {
        OwnerId: "1",
        Id: "1",
        Name: "Trial Whisperer",
        Salary__c: "$110,000",
        PostingDate__c: "2024-02-28",
        ClosingDate__c: "2024-05-10",
        FileUrl__c: "https:/this-domain.org/documents/requirements",
        Employer__c: "JusticeShield Attorneys",
        Location__c: "Cedarwood Heights",
        OpenUntilFilled__c: true,
      },
      {
        OwnerId: "2",
        Id: "2",
        Name: "Justice Architect",
        Salary__c: "$96,000",
        PostingDate__c: "2024-04-17",
        ClosingDate__c: "2024-06-01",
        FileUrl__c: "https://a-domain.law/justice-architect",
        Employer__c: "Liberty Legal Associates",
        Location__c: "Haborview Bay",
        OpenUntilFilled__c: false,
      },
    ]
  };
}