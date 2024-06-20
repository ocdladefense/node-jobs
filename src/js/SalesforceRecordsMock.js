import HttpMock from "@ocdla/lib-http/HttpMock";
import Url from "@ocdla/lib-http/Url";


  const exampleDescription = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit tellus scelerisque neque interdum ullamcorper. Praesent a massa at est feugiat molestie. Proin aliquet auctor turpis vel vestibulum. Nam iaculis, ligula et ultrices pretium, sem odio ullamcorper enim, a efficitur lectus augue vel ante. Morbi vitae pellentesque libero, et mattis est. Aliquam vestibulum purus a urna condimentum pharetra. Donec nulla ante, tincidunt quis augue sed, finibus euismod lectus. Aliquam erat volutpat.

Fusce et lectus et mauris ultricies ullamcorper non id purus. Curabitur dapibus egestas magna, quis pretium turpis malesuada et. Donec iaculis nisi sit amet sollicitudin volutpat. Nunc nec mattis velit. Sed dignissim nec neque vitae tincidunt. Proin vestibulum condimentum lobortis. Donec quis orci est. Nam ex libero, faucibus condimentum varius ut, lacinia sed quam. Donec ut tellus leo. Donec dignissim tincidunt lorem eget venenatis. Integer interdum risus tortor, mattis rutrum ex ullamcorper eget. Aenean sem eros, tincidunt vel commodo id, egestas id ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam vel magna quis nibh convallis aliquam. Maecenas non lacus at erat eleifend ornare. Donec tempor ullamcorper dignissim.
`.trim();


export default class SalesforceJobMock extends HttpMock {
  #list;

  constructor(records) {
    super();
    console.log(records);
    let tmp = [];

    let tmpIndex = 1;
    records.forEach((record) => {
      let id = record.Id || tmpIndex++;
      record.Id = id;
      tmp.push([record.Id, record]);
    });
    

    this.list = new Map(tmp);
  }

  async getResponse(req) {
    let url, job, recordId, success;
    url = new Url(req.url);

    if (req.method === "GET") {
      return Response.json({ records: Array.from(this.list.values()) });
    } else if (req.method == "DELETE") {
      recordId = url.getLastPathSegment();
      success = this.deleteRecord(recordId);

      return new Response(null, { status: success ? 204 : 403 });
    } else if (req.method == "POST") {
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
    } else if (req.method == "PATCH") {
      recordId = url.getLastPathSegment();

      job = await req.json();
      this.updateRecord(recordId, job);

      return Response.json(null, { status: 204 });
    }
  }

  deleteRecord(recordId) {
    return this.list.delete(recordId);
  }

  addRecord(key, job) {
    return this.list.set(key, job);
  }

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
        OpenUntilFilled__c: false,
        Description__c: exampleDescription,
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
        Description__c: exampleDescription,
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
        Description__c: exampleDescription,
      },
    ],
  };
}


