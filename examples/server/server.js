const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(cors());


const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    }, 
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
})

const uploads = multer({storage: storage});
//const uploads = multer({dest: __dirname + "/uploads"});

// Change to 'dist'
app.use(express.static('examples/server/public'));



// Goal - how do we marry node server with our compiled webpack code?


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/upload.html");
});




app.post("/uploads", uploads.array("files"), (req, res) => {
    console.log(req.body);
    console.log(req.files);
    res.json({status: "files received"});
})

app.listen(5500, function(){
    console.log("Server running on port 5500")
})