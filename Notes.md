# How To Do This

### Setup (done)
* create a git repository 
* create a project in that repository
* add webpack and npm to the project 
* add the @ocdla library to the project. We need:
    * /view
    * /salesforce

```javascript 

class Job {
    constructor(jobTitle, salary, datePosted, fileUrl="", employer) {
        this.jobTitle = jobTitle;
        this.salary = salary;
        this.datePosted = datePosted;
        this.fileUrl = fileUrl;
        this.employer = employer;
    }

    static newFromJSON(data) {
        return new Job(
            jobTitle: data.jobTitle,
            salary: data.salary,
            datePosted: data.datePosted,
            fileUrl: data.fileUrl,
            employer: data.employer
        );
    }
}

//we need three jobs to work with, prolly gon store in array

let theData = {
    jobTitle: "Attorney",
    salary: "$1,000,000,000",
    datePosted: "4/3/2024",
    fileUrl: "https://mydomain.com/catpic",
    employer: "ACME Lawyers Inc."
}

let job = new Job();
let theJob = Job.newFromJSON(theData);


<jobPostingForm job={theData}/>

let jobPostingForm = (props) => {
    let job = props.job;
    let update = job.Id != null;
    return 
    <form>
        <label for="jobTitle">Job Title</label>
        <input id="jobTitle" value={job.jobTitle}>
        <label for="salary">Salary</label>
        <input id="salary">
        <label for="datePosted">Date Posted</label>
        <input id="datePosted">
        <label for="employer">Employer</label>
        <input id="employer">
    </form>
}
```



```javascript 

let fileUrl = "https://mydomain.com/catpic";

let fileUpload = (props) => {
    let file = props.file;
    let enableMultipleFiles = false;

    return 
    <div class="form-group">
        <label for="fileUploadController">Example file input</label>
            
        <input type="file" class="form-control-file" id="fileUploadController">
        if (enableMultipleFiles == true) 
            <input type="btn" class="" name="removeFile"/> 
        <input type="btn" class="" name="addFile"/>
    </div>
}

```



```javascript
let theData = {
    jobTitle: "Attorney",
    salary: "$1,000,000,000",
    datePosted: "4/3/2024",
    fileUrl: "https://mydomain.com/catpic",
    employer: "ACME Lawyers Inc."
}

<jobPostingCard job={theData}/>

let jobPostingCard = (props) {
    let job = props.job;
    return 
<div class="card">
    <div>{job.jobTitle}</div>
    <div>{job.salary}</div>
</div>
}

```
### View/Components
* Job Posting Form - Charlese
* File Upload - Charlese
* Job Posting Card - Kelsie

### Data - Alex
* add new fields (description, employee) to the object manager in salesforce
* introduce those fields to the sql query (description, employee, days since posted)
* be able to upload files to the node server 
* normalize the data using the Job class

### File Upload - Charlese
* add remove file option
* make sure field is nullable if the user doesn't want to upload any documents
* resolve issue where file upload input field dissapears when "cancel" is clicked

### UI Design - Kelsie
* Note: Gotta be responsive
* make information more noticeable 
* but keep the text size on the mobile views (bootstrap)
* basic list maybe?
* hide "create a job posting" if user is not able to follow the link 
* make links more noticeable when needed

### Job Posting Form - Charlese
* add an explicit "cancel" button (redirect to the job postings page)


### Aspirations for Tuesday 

#### Alex
Ideally:
* get objects made and have them introduced to an sql query

Promise to:
* have the objects done

#### Kelsie
Ideally:
* have job posting cards done
* make information more noticeable
* make links more noticeable when needed

Promise to:
* keep the text size on mobile views using bootstrap or some other design
* make information more noticeable

### Charlese
Ideally:
* Implement my JSX (with "cancel" button on the form)
* File upload stuff 

Promise:
* Implement my JSX stuff


Note:
* We each will create feature branches
* Naming convention ex: `my-good-feature`
* Tuesday we will look at merging
* Give your branch a name that reflects what you are gonna do, Ex: `fetch-job-data`
* He will be giving us all access to the new repository
* He will add us to the OCDLA intern slack channel 


