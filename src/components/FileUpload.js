/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import SalesforceRestApi from "@ocdla/salesforce/SalesforceRestApi.js";

export default class FileUpload {
  useMock = USE_MOCK_RECORDS;

  constructor(url) {
    this.api = new SalesforceRestApi(INSTANCE_URL, ACCESS_TOKEN);
    this.fileUrl = url;
  }

  getFileInput(id) {
    let elem = document.getElementById(id);
    return elem.files[0];
  }

  async handleEvent(e) {
    let target = e.target;
    let dataset = target.dataset;
    let action = target.dataset.action;
    let file;

    if (dataset == null || action == null) {
      return;
    }

    if (action === "upload") {
      file = this.getFileInput("file-upload");
      await this.uploadFile(file);
    }
  }

  async uploadFile(file) {
    // Implement file upload logic here.
    // This could involve sending a request to the server or a third-party service.
    // For example, if using the Salesforce API, it might look something like this:
    // await this.api.uploadFile("Job__c", job.Id, file);
  }

  render() {
    let multipleFilesEnabled = false;

    return (
      <div class="mb-3">
        <label for="file-upload" class="form-label">Upload Files</label>
        <div class="input-group">
          {this.fileUrl != "" ? (
            <span>{this.fileUrl}</span>
          ) : (
            <input type="file" class="form-control-file" id="file-upload" value={this.fileUrl} aria-describedby="file-upload-help" />
          )}
          <input type="button" data-action="upload" value="Upload File" onClick={this.handleEvent.bind(this)} />
          <input type="button" data-action="remove" value="Remove File" onClick={this.handleEvent.bind(this)} />
          {multipleFilesEnabled ? (<input type="button" data-action="add" value="Add File" onClick={this.handleEvent.bind(this)} />) : ("")} 
        </div>
        <div id="file-upload-help" class="form-text fs-6">Any files relevant to the position (insert data constraints here).</div>
      </div>    
    );
  }
}
