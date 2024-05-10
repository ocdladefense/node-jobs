/* Tried this way. Didn't quite work out. */

const form = document.getElementById('form');
const inpFile = document.getElementById('inpFile');

form.addEventListener("submit", e => {
    e.preventDefault();

    const endpoint = "upload.php";
    const formData = new FormData();

    formData.append("inpFile", inpFile.files[0]);

    fetch(endpoint, {
        method: "post",
        body: formData
    }).catch(console.error);
})