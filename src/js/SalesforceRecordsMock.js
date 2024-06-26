import HttpMock from "@ocdla/lib-http/HttpMock";
import Url from "@ocdla/lib-http/Url";

export default class SalesforceJobMock extends HttpMock {
  #list;

  constructor(jsonData) {
    super();
    this.records = jsonData;

    let tmp = [];

    let i = 1;
    this.records.records.forEach((record) => {
      let id = i++;
      record.Id = id.toString();
      tmp.push([record.Id, record]);
    });

    this.list = new Map(tmp);
  }

  async getResponse(req) {
    let url, job, recordId, success;
    url = new Url(req.url);

    if (req.method === "GET") 
    {
      return Response.json({ records: Array.from(this.list.values()) });
    } 
    else if (req.method == "DELETE") 
    {
      recordId = url.getLastPathSegment();
      success = this.deleteRecord(recordId);

      return new Response(null, { status: success ? 204 : 403 });
    } 
    else if (req.method == "POST") 
    {
      job = await req.json();

      let listSize = this.list.size + 1;
      let id = listSize.toString();
      job.Id = id;
      this.addRecord(id, job);
      let body = {
        id: id,
        errors: [],
        success: true,
      };

      return Response.json(body, { status: 201 });
    } 
    else if (req.method == "PATCH") 
    {
      recordId = url.getLastPathSegment();

      job = await req.json();

      success = this.updateRecord(recordId, job);

      return new Response(null, { status: success ? 204 : 403 });
    }
  }

  deleteRecord(recordId) {
    return this.list.delete(recordId);
  }

  addRecord(key, job) {
    return this.list.set(key, job);
  }

  updateRecord(recordId, job) {
    job.Id = recordId;
    return this.list.set(recordId, job);
  }

}


