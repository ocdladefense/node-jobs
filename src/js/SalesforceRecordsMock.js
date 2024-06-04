import HttpMock from "@ocdla/lib-http/HttpMock";
import Url from "@ocdla/lib-http/Url";
/**
 * Can be registred with HttpClint to handle out bound requests sent by the website, from the user
 */
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



  /**
   * based on the request.method it will modify this.list, then returns a reponse of based on the example Salesforce documentation
   * @param {Request} req - The Request object sent  to the server.
   * @returns Response object;
   */
  async getResponse(req) {
    let url, job, recordId, success;
    url = new Url(req.url);

    if (req.method === "GET") {
      return Response.json({ "records": Array.from(this.list.values()) });
    }

    else if (req.method == "DELETE") {

      recordId = url.getLastPathSegment();
      success = this.deleteRecord(recordId);

      return new Response(null, { status: (success ? 204 : 403) });
    }

    else if (req.method == "POST") {

      job = await req.json();

      let listSize = this.list.size + 1;
      let id = listSize.toString();
      job.Id = id;
      this.addRecord(id, job);
      let body = {
        "id": id,
        "errors": [],
        "success": true
      }

      return Response.json(body, { status: 201 });
    }

    else if (req.method == "PATCH") {
      recordId = url.getLastPathSegment();


      job = await req.json();
      this.updateRecord(recordId, job);

      return Response.json(null, { status: 204 });
    }
  }


  /**
   * Deletes the record from the list.
   * @param {string} recordId - The Id of the record to be deleted.
   * @returns {boolean} - True if the record was deleted.
   */
  deleteRecord(recordId) {

    return this.list.delete(recordId);
  }

  /**
   * Adds a new record to the list.
   * @param {string} key - The key of the record 
   * @param {Object} job - The job to be added.
   * @returns {Map} - The updated list after adding the record.
   */
  addRecord(key, job) {
    return this.list.set(key, job);
  }

  /**
   * Updates a record in the list.
   * @param {string} recordId - The Id of the to be updated. 
   * @param {Object} job - The updated Job object.
   * @returns {Map} - The updated list after the update.
   */
  updateRecord(recordId, job) {

    return this.list.set(recordId, job);
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




async function readRequestBody(request) {
  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let result = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value, { stream: true });
  }
  return result;
}
