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
}