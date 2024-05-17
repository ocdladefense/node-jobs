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

### Alex 
* research: why we can use short module paths in our webpack build
* get rid of all the stuff that is no longer needed in joblist.js
* anything for form rendering is going to be in controller.js, not joblist.js
* joblist has one action for handle event, which is delete action 


# Notes
* I ran into an issue with bootstrap validation, I can demonstrate if needed. I suspect I either am not understanding how to properly use the view library, or there is a previously unknown bug in the code.
* Improvement Notes (indeed.com, myworkday.com):
  * add job description field
  * add number of jobs found in a search at top of the page
  * add remoteness field (on-site, hybrid, remote, flexible, etc)
  * be more specific about location data (country, state, county, city)
  * add whether the job is full-time, part-time, contract, or something else?
  * add salary range?
  * add star rating of the employer
  * add job rank field (beginner, intermediate, advanced. May need to be adjusted for law specifically)
  * add search filters for various fields
  * add a detailed job view when a job card is clicked, `including:
    * a full description
    * an apply now button
    * a bookmark (save for later) button
    * a hide job button
    * a similar jobs link 
    * share
  * add links to other relevant search filter settings on each job card
  * add a snippet of the job description on the job card
  *





