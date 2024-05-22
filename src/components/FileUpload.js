/** @jsx vNode */
import { vNode, View } from "@ocdla/view";
import SalesforceRestApi from "@ocdla/salesforce/SalesforceRestApi.js";

export default class FileUpload {
  useMock = USE_MOCK_RECORDS;

  constructor(url) {
    this.api = new SalesforceRestApi(INSTANCE_URL, ACCESS_TOKEN);
    this.fileUrl = url;
  }

  // getFileInput(id) {
  //   let elem = document.getElementById(id);
  //   return elem.files[0];
  // }

  getFileInput(id) {
    let elem = document.getElementById(id);
    let fileNameLabel = document.getElementById('file-name');

    elem.addEventListener('change', (event) => {
      console.log(envent.target.files[0]);
      fileNameLabel.textContent = event.target.files[0].name;
    });
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

  async uploadFile(file, jobName) {
    // Create a new FormData instance
    const formData = new FormData();

    // Append the file and job name to the FormData instance
    formData.append("files", file);
    formData.append("jobName", jobName);

    // Send a POST request to the server
    const response = await fetch('http://localhost:5500/uploads', {
        method: 'POST',
        body: formData,
    });

    // Parse the JSON response
    const data = await response.json();

    // Log the response data
    console.log(data);
}

  render() {
    let multipleFilesEnabled = false;
  
    return (
      <div class="mb-3">
        <label for="file-upload" class="form-label">Upload Files</label>
        <div class="input-group">
          {this.fileUrl != "" ? (<span>{this.fileUrl}</span>) : null}
          <input type="file" class="form-control-file" id="file-upload" value={this.fileUrl} aria-describedby="file-upload-help" />
          <label id="file-name" class="form-label"></label> {/* Add this line */}
          <input type="button" data-action="upload" value="Upload File" onClick={() => document.getElementById('file-upload').click()} />
          <input type="button" data-action="remove" value="Remove File" onClick={this.handleEvent.bind(this)} />
          {multipleFilesEnabled ? (<input type="button" data-action="add" value="Add File" onClick={this.handleEvent.bind(this)} />) : ("")} 
        </div>
        <div id="file-upload-help" class="form-text fs-6">Any files relevant to the position (insert data constraints here).</div>
      </div> 
    );
  }  
}