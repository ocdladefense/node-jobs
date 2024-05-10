const form = document.querySelector('form');

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
