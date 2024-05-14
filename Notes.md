# Between now and friday:
* convert jobform to also be a component class the same way the job list is
* in the meantime, all of our controller code is now in joblist
* need to move any form handle event stuff out of joblist and into jobform, specifically save
* jobform is supposed to manage saves now 
* the jobform will be listening for submit event <- add in kelsie's *file upload* code
* will also need to insert the bootstrap code for the *form validation* on submit
* jobcard remains unchanged
* controller.js goes away
* we need to get the date values to show up in the input fields in the form 
* and we need reasonable placeholders when appropriate


### Kelsie 
* handles updates to the jobform component 
* component class and file handling javascript
* grid styling job list

### Charlese 
* essentially the same thing but for the bootstrap validation code
* research: pick two well regarded job posting sites, and document between 10-15 ideas for how to make our job postings more appealing or accurate or have better data or whatever
  * Example: so like, adding a job description field for example
  * see what kind of features you can add 
  * Example: date library? like, posted yesterday instead of May 14th 2024

### Alex 
* research: why we can use short module paths in our webpack build
* get rid of all the stuff that is no longer needed in joblist.js
* anything for form rendering is going to be in controller.js, not joblist.js
* joblist has one action for handle event, which is delete action 


