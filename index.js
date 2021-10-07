const fs = require("fs")

const express = require("express")
const path = require("path")
const multer = require("multer")

const app = express()


app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")


var storageConfig = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, "uploads") //folder 
    },
    filename: function (req, file, next) {
        fileName = file.originalname;
        ext = path.extname(file.originalname)
        next(null, fileName);//user myfile  
    }
})
var maxFileSize = 1024 * 1000 * 10;

var upload = multer({
    storage: storageConfig,
    limits: { fileSize: maxFileSize },
    fileFilter: function (req, file, next) {
        console.log("mime => "+file.mimetype);
        var mimeType = /jpeg|png|jpg|gif|plain/.test(file.mimetype)
        console.log("name => ", file.originalname);
        console.log("ext => ", path.extname(file.originalname));
        if (mimeType == true) {
            return next(null, file.originalname) // null => no error 
        } else {
            next("ERROR : INVALID FILE")
        }
    }
}).single("myfile");


app.post("/uploadfile", function (req, res, next) {
    upload(req, res, function (err,resp) {
        if (err) {
            res.send(err);
        } else {
            console.log("resp => "+resp);
        //    var data = fs.readFileSync(__dirname+"/uploads/")
            res.send("done");
        }
    })
})


app.get("/", function (req, res) {
    res.render("upload"); // upload.ejs 
})



app.listen(3000, function () {
    console.log("server started...");
})