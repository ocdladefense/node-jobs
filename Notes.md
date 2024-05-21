### Notes

# Charlese
* Validation
* Implement Job Description field - full text
* Details page - Additional route

# Kelsie & Alex
* Each action is working with form
* Determine basic UX validation fails, let user know, what to happen



# Charlese's code notes:
* In the JobForm, where the ternary operator for deciding whether or not to display the delete button is, I ran into an issue that I hadn't seen before. When creating a new job, the id is SUPPOSED to be an empty string. For some reason, on the webpage it was undefined. So I just added that to the condition. If the id is undefined OR an empty string, don't display the delete button. That worked, but it seemed odd to me.
* Question: Which fields should be required? I currently only have Job Title required on the form.
* A validation message only shows up on the form if the field was not valid. Otherwise a green checkmark indicates a valid entry.
* currently the form only validates required fields. I am still figuring out how to do data validation.