const express = require('express'); // Web app framework for Node.js
const multer = require('multer'); // Middleware for handling multipart/form-data
const cors = require('cors'); // A package for providing Connect/Express middleware that can be used to enable CORS with various options
const fs = require('fs');

const app = express();
//app.use(cors());
app.use(cors({ origin: 'http://localhost:8080' }));

// const storage = multer.diskStorage({
//     destination: function(req, file, callback) {
//         callback(null, __dirname + "/uploads");
//     }, 
//     filename: function(req, file, callback) {
//         callback(null, file.originalname);
//     }
// });

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        // Set the default upload directory
        let uploadDir = __dirname + "/uploads/";

        // Check if jobName is provided and append it to the upload directory
        const jobName = req.body.jobName;
        if (jobName) {
            uploadDir += jobName + "/";
        }

        // Create the directory if it doesn't exist
        fs.mkdirSync(uploadDir, { recursive: true }, (err) => {
            if (err) throw err;
        });

        callback(null, uploadDir);
    },
    filename: function(req, file, callback) {
        // Use the original file name or a new name
        const newFileName = 'renamedFile.pdf'; // Change this to use a dynamic naming strategy if needed
        callback(null, newFileName);
    }
});

const uploads = multer({ storage: storage });

//const uploads = multer({dest: __dirname + "/uploads"});

// Change to 'dist'
app.use(express.static('public'));

app.get('/foobar', (req, res) => {
    res.send("GET Request Called")
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post("/uploads", uploads.array("files"), (req, res) => {
    console.log(req.body);
    console.log(req.files);
    res.json({status: "files received"});
});

app.listen(5500, function(){
    console.log("Server running on port 5500")
});