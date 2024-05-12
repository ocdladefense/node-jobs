# Notes

## Keep
* server.js
* Add the following code to controller.js:
```
    const files = document.getElementById("files");

    const formData = new FormData();
    for (let i=0; i < files.files.length; i++) {
        formData.append("files", files.files[i]);
    }

    fetch('/uploads', {
        method: 'POST',
        body: formData,
    })
    .then(res => res.json())
    .then(data => console.log(data));
```

## Remove
* package.json
* package-lock.json
* index.js
* index.html

## Entry Points / Changes
```
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});
```

## To-Do
* npm update
* node server
* url: 
* Move relevant files/folders
* Test
* Commit/Push

## Completed
* index.html example:
```
<body>
        <form>    
            <input type="file" name="file" id="files" multiple />
    
            <button type="submit">Submit</button>
        </form>

        <script src="/index.js"></script>
    </body>
```

* Add following to Package.json:
```
"dependencies": {
    "cors": "^2.8.5",
    "express": "^4.19.2",
    "multer": "^1.4.5-lts.1"
}
```

* uploads folder - Completed
* Add /uploads to .gitignore