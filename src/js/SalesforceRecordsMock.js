import HttpMock from "@ocdla/lib-http/HttpMock";
import Url from "@ocdla/lib-http/Url";


  const exampleDescription = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit tellus scelerisque neque interdum ullamcorper. Praesent a massa at est feugiat molestie. Proin aliquet auctor turpis vel vestibulum. Nam iaculis, ligula et ultrices pretium, sem odio ullamcorper enim, a efficitur lectus augue vel ante. Morbi vitae pellentesque libero, et mattis est. Aliquam vestibulum purus a urna condimentum pharetra. Donec nulla ante, tincidunt quis augue sed, finibus euismod lectus. Aliquam erat volutpat.

Fusce et lectus et mauris ultricies ullamcorper non id purus. Curabitur dapibus egestas magna, quis pretium turpis malesuada et. Donec iaculis nisi sit amet sollicitudin volutpat. Nunc nec mattis velit. Sed dignissim nec neque vitae tincidunt. Proin vestibulum condimentum lobortis. Donec quis orci est. Nam ex libero, faucibus condimentum varius ut, lacinia sed quam. Donec ut tellus leo. Donec dignissim tincidunt lorem eget venenatis. Integer interdum risus tortor, mattis rutrum ex ullamcorper eget. Aenean sem eros, tincidunt vel commodo id, egestas id ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam vel magna quis nibh convallis aliquam. Maecenas non lacus at erat eleifend ornare. Donec tempor ullamcorper dignissim.
`.trim();


export default class SalesforceJobMock extends HttpMock {
  #list;

  constructor(jsonData) {
    super();
    this.records = jsonData;

    let tmp = [];

    this.records.records.forEach((record) => {
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

}


