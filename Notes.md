### Notes
##### Continue working on:


### Research findings
##### Bootstrap Validation
* https://getbootstrap.com/docs/5.0/forms/validation/#how-it-works
* validation with bootstrap is possible
    * class "needs-validation" should be added to the form element
    * add "required" attribute to inputs that are required
    * a div with the class "valid-feedback" will be used for the success message
    * and a div with the class "invalid-feedback" will be used for the error message
    * Here is an example of the javascript function that would go with these attributes and classes I think:
```
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()
```
##### Salesforce Name field
* Custom Object Name fields have max of 80 characters





#### 
* somehwere in the onedit event handler, execute the above function
* add the isActive stuff on the form
* practice pushing the fields up to our ocdla sandboxes 
* you will need to add jobs to your oclda sandbox to use that
* its okay to pretend that function for bootstrap is working in controller, paste into the console and execute it if needed
* try to implement in the controller, and encorporate bootstrap styling

# Charlese
* Validation
* Implement Job Description field - full text

# Kelsie & Alex
* Each action is working with form
* Determine basic UX validation fails, let user know, what to happen