/*
Note: The following code is not tested! The code below are 
examples of how we might handle the file uploads!
*/

/* I suggest maybe putting this code in the controller.js file */
class example {
    constructor() {
        document.getElementById('fileUpload').addEventListener('change', this.handleFileUpload.bind(this));
    }

    /* An idea of how to support mutiple files: */
    handleFileupload(e) {
        for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i];
        }
    }

    /* 
    An idea to upload files to a server, we could use fetch
    API or axios to send a POST request. The following is an 
    example of doing so. We would have to replace the endpoints
    with the URL of the server's file upload endpoint:
*/

async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await fetch('/upload-endpoint', {
      method: 'POST',
      body: formData
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      console.log('File uploaded successfully');
    }
}

/*
Then call the function above in the handleFileUpload method.
*/
}

