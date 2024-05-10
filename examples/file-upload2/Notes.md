# File-Upload Option 1

## Notes

* Does use node to upload files
* Does not currently work
* It is an example of how it might work

## Explanation

The code below is used to handle file uploads from a form to a server:

```
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const files = document.getElementById("files");

    const formData = new FormData();
    for (let i=0; i < files.files.length; i++) {
        formData.append("files", files.files[i]);
    }

    fetch('http://127.001:5500/uploads', {
        method: 'POST',
        body: formData,
    })
    .then(res => res.json())
    .then(data => console.log(data));
})
```

* The ```form.addEventListener('submit', (e) => {...})``` attaches an event listener to the form that triggers when the form is submitted
* ```e.preventDefault``` prevents the default action of the form submission, which is to refresh the page
* ```const files = document.getElementById("files");``` gets the file input element with the id “files” from the HTML document.
* ```const formData = new FormData();``` creates a new FormData object. FormData objects are used to store key-value pairs that can be sent using the XMLHttpRequest or fetch API.
* ```fetch('http://127.001:5500/uploads', {...})``` sends a POST request to the server at ‘http://127.001:5500/uploads’ with the FormData object as the body.
* ```.then(res => res.json())``` waits for the server to respond, then converts the response to JSON.
* ```.then(data => console.log(data));``` logs the data received from the server to the console


The following code is a server-side script that uses Express.js, Multer, and CORS (Cross-Origin Resource Sharing) to handle file uploads:
```
const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(cors());

/*
const storage = multer.diskStorage({
    desination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    }, 
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
})
*/

//const uploads = multer({storage: storage});
const uploads = multer({dest: __dirname + "/uploads"});

app.post("/uploads", uploads.array("files"), (req, res) => {
    console.log(req.body);
    console.log(req.files);
    res.json({status: "files received"});
})

app.listen(5500, function(){
    console.log("Server running on port 5500")
})
```

