# Installation
Add installation instructions here...


# Dependencies (if any)


# Known bugs
* Delete from list is not working.
* Toggle between details and list views.




### Setup (done)
* create a git repository 
* create a project in that repository
* add webpack and npm to the project 
* add the @ocdla library to the project. We need:
    * /view
    * /salesforce



## Relevant Links
* [Serving static files in Express](https://expressjs.com/en/starter/static-files.html)
* [Express app.get() Request Function](https://www.geeksforgeeks.org/express-js-app-get-request-function/)
* [Using JSON](https://stackoverflow.com/questions/43735486/load-static-json-file-in-webpack)]

## Note:
* We each will create feature branches
* Naming convention ex: `my-good-feature`
* Tuesday we will look at merging
* Give your branch a name that reflects what you are gonna do, Ex: `fetch-job-data`
* He will be giving us all access to the new repository
* He will add us to the OCDLA intern slack channel 


### Charlese
* finish the other components
* work with Kelsie to determine best css class names for basic styling 
* work with the static data first
* make sure there is at least 3 mock data jobs, hardcode them wherever appropriate
* get programs installed on my own machine 
* Link is: https://developer.salesforce.com/tools/vscode/en/vscode-desktop/java-setup


# Express Server / Node file uploads

## Installation / steps to run
* Step 1: Checkout <code>development</code> branch of this repository.
* Step 2: Run <code>git pull</code>.
* Step 3: Run <code>npm update</code>.
* Step 4: Run <code>node examples/server/server.js</code>.
* Step 5: In a web browser, navigate to [the Express server web page](http://localhost:5500).
* Step 6: Open Chrome/Firefox developer console; confirm there are no Network issues or JavaScript errors.
* Step 7: Use the HTML form to select a file for upload.
* Step 8: Confirm the file upload by selecting the <code>submit</code> button.
* Step 9: Use the developer console/Network tab to confirm that the <code>POST</code> request to the <code>/uploads</code> endpoint was successfull.
* Step 10: In a file browser, confirm that the file you selected has been uploaded to the <code>/uploads</code> directory.

## To-Do
* npm update
* node server
* file path: C:\Users\kelsi_trwt3rq\Portfolio\Internship\node-jobs\examples\upload-files\index.html
Note: Your file path may be different from mine.
* Move relevant files/folders
* Test
* Commit/Push

## Completed
### Keep
* index.html example:
```
<body>
        <form>    
            <input type="file" name="file" id="files" multiple />
    
            <button type="submit">Submit</button>
        </form>

        <script src="/index.js"></script>
    </body>
```

* Add following to Package.json:
```
"dependencies": {
    "cors": "^2.8.5",
    "express": "^4.19.2",
    "multer": "^1.4.5-lts.1"
}
```

* uploads folder - Completed
* Add /uploads to .gitignore
* Add the following code to controller.js:
```
    const files = document.getElementById("files");

    const formData = new FormData();
    for (let i=0; i < files.files.length; i++) {
        formData.append("files", files.files[i]);
    }

    fetch('/uploads', {
        method: 'POST',
        body: formData,
    })
    .then(res => res.json())
    .then(data => console.log(data));
```
* server.js

### Remove
* package.json
* package-lock.json
* index.js
* index.html

### Entry Points / Changes
```
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});
```

## Edit
* Delete a file - but doesn't want the job to be delete/removed
* User tries to edit the form, but changes their mind
* User tries to change/add file
* User can edit a file - succeeds
* User tries to edit a job - but fails
* User tries to edit a file - don't have credentials

## Delete
* User tries to delete a file - but it fails
* User accidently removes file - didn't want to remove file
* User tries to delete a file - succeeds
* User wants to delete the file but not the job
* User tries to delete a file - don't have credentials

## Create
* Users can create a file for a new job posting
* Users do not need to create a file
* Users try to upload a new file - but it fails
* Users try to upload a new file - but don't want the file associated the form/job











# Description

I created a SPA that allows users to view, create, edit, delete and upload files to job postings at ocdla. I utilized node server to upload the files, and salesforce to save job data. I used JSX components and bootstrap to make our code more modular and to implement user-friendly styles. I utilized github to organize code and collaborate with a team of programmers. I used npm to create and manage our own library modules. I used slack, discord, zoom, and emails to communicate with my team. During team meetings we utilized the time to debug and plan for next steps on the project and how to complete them. This project benefited the organization by bringing an easier user experience, as well as adding more features. In the future I would like to see the ability to search for jobs by keywords, location, organization, title, salary range, and date posted. Mock data helped us work on front end and back end simulutaneously before they were connected.