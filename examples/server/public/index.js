
let form = document.getElementById("my-file-upload");

form.addEventListener("submit", (e) => {

    e.preventDefault();
    e.stopPropagation();

    const files = document.getElementById("files");

    const formData = new FormData();
    for (let i = 0; i < files.files.length; i++) {
        formData.append("files", files.files[i]);
    }

    fetch("/uploads", {
        method: "POST",
        body: formData,
    })
    .then((res) => res.json())
    .then((data) => console.log(data));
});