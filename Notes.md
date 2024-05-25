# Notes

#### Charlese
* Validation
* Implement Job Description field - full text
* Details page - Additional route

#### Kelsie & Alex
* Each action is working with form
* Determine basic UX validation fails, let user know, what to happen



# Charlese's code notes

### Bootstrap Validation
* In the JobForm, where the ternary operator for deciding whether or not to display the delete button is, I ran into an issue that I hadn't seen before. When creating a new job, the id is SUPPOSED to be an empty string. For some reason, on the webpage it was undefined. So I just added that to the condition. If the id is undefined OR an empty string, don't display the delete button. That worked, but it seemed odd to me.
* A validation message only shows up on the form if the field was not valid. Otherwise a green checkmark indicates a valid entry.
* currently the form only validates required fields. I am still figuring out how to do data validation.

### Details View
* Not 100% sure how to pass the data from the JobList to the Details view?

### Description Field
* Description field has been added as a Long Text area (32,000+ chars, oops), though its currently not displaying anywhere.

### Ideas:
* A Notes folder, with 4 Notes.md files, one for each of us. That way we don't lose notes to merging, we each and pick our most up to date notes.

### Questions:
* Since jobform is now taking a recordId, what do we do when we want the form to be empty? previously we added an empty job object 
* Which fields should be required? I currently only have Job Title required on the form. !Answered!

### Answers:


# Meeting Notes 5/21
### Me TODO
* Get all the JobForm input fields named uniformly 
* Add a validate method to check if instanceUrl and Accesstoken are not null or undefined or empty strings or whatever, throw new error   in salesforcerestapi. (do it in the send method)
* I need to update the employment package to reflect the new Description field.
* Write a method that converts from month-day-year to yyyy-mm-dd in the controller
* Job constructor can automatically set the posting date to current date 
* and automatically set closing date to current day + 30 days
* Salesforce rest api send() validation (make sure to handle if instanceUrl and access token are empty)
* do the standaline deets first, then try the one that does both joblist and details (JobSearch)


### Notes from Tuesday Meeting 5/21
* Cancel is in fact supposed to be a button, and handled by the JobForm.


## Running server.js
* Use node src/js/server.js to run server.js
* Use netstat -ano |findstr :5500 to filter and display network statistics related to the port number 5500
* Use taskkill /PID 22856 /F to kill server