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
        let uploadDir = __dirname + "/../../uploads/";
        const jobName = req.body.jobName;
        if (jobName) {
            uploadDir += jobName + "/";
        }
        fs.mkdirSync(uploadDir, { recursive: true });
        callback(null, uploadDir);
    },
    filename: function(req, file, callback) {
        const jobName = req.body.jobName; // Access jobName from req.body
        const newFileName = jobName //|| file.originalname; // Use jobName if provided, otherwise use original file name
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