/** @jsx vNode */

import { vNode, View } from "@ocdla/view";



let fileUrl = "https://mydomain.com/catpic";


const FileUpload = function (props) {
  let file;
  if (props != null) {
    file = props.file;
  }

  return (
    <div class="form-group">
      <label for="fileUpload">Upload Files:</label><br />

      <input type="file" class="form-control-file" id="fileUpload" />
      <input type="button" value="Remove File" />
      <input type="button" value="Add File" /><br />

    </div>
  );
};



const JobForm = function (props) {
  let job = props.job;
  let update = !!job.id;


  return (
    <form>
      <label for="title">Job Title:</label>
      <input id="title" placeholder="Enter Job Title" value={job.jobTitle} />

      <label for="employer">Employer:</label>
      <input
        id="title"
        placeholder="Enter the employer"
        value={job.employer}
      />

      <label for="salary">Salary:</label>
      <input id="salary" placeholder="Enter the Salary" value={job.salary} />

      <label>Location:</label>
      <input id="location" placeholder="Enter the Location" value={job.location}/>

      <label for="datePosted">Date Posted:</label>
      <input
        id="datePosted"
        placeholder={job.datePosted}
        value={job.employer}
      />

      <label for="dateClosing">Date Closing:</label>
      <input
        id="dateClosing"
        placeholder={job.dateClosing}
        value={job.employer}
      />

      <FileUpload url={fileUrl} />

      <label>Open until filled?</label>
      <input id="openUntilFilled" type="checkbox" checked />

      <input class="button" type="submit" data-action="save" value="Save" />
      <input class="button" type="submit" data-action="delete" value="Delete" />
      <input class="button" type="submit" data-action="cancel" value="Cancel" />
    </form>
  );
};

export default JobForm;