/** @jsx vNode */
import { vNode, View } from "@ocdla/view";



export default class FileUpload {

  multipleFilesEnabled = false;

  constructor(url) {
    this.fileUrl = url;
  }

  async handleEvent(e) {
    let target = e.target;
    let dataset = target.dataset;
    let action = target.dataset.action;
    let file;

    if (dataset == null || action == null) {
      return;
    }

    if (action === "remove") {
      document.getElementById('file-name').textContent = '';
    }
  }

  render() {
    return (
      <div class="mb-3">
        <label for="file-upload" class="form-label">Upload Files</label>
        <div class="input-group">
          {this.fileUrl != "" ? (<span>{this.fileUrl}</span>) : null}
          <input type="file" name="file-upload" class="form-control-file" id="file-upload" value={this.fileUrl} aria-describedby="file-upload-help" />
          <i class="fas fa-file-upload"></i>
          <label id="file-name" class="form-label"></label> {/* Add this line */}
          <input type="button" data-action="remove" value="Remove File" />
        </div>
        <div id="file-upload-help" class="form-text fs-6">Any files relevant to the position (insert data constraints here).</div>
      </div> 
    );
  }  
}