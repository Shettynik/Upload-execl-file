const multer = require("multer");

// Multer package is used to store the file in the destination provided with the given filename
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./uploads/")
    },
    filename: function(req, file, cb){
        var datetimestamp = Date.now();
        cb(null, file.fieldname+ "-"+ datetimestamp+"-"+file.originalname.split(".")[file.originalname.split(".").length - 1])
    }
});

// fileFilter is used to check whether the uploaded file satisfies the extension type
var upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback){
        if(["xls","xlsx"].indexOf(file.originalname.split(".")[file.originalname.split('.').length-1])===-1){
            return callback(new Error("Wrong Extension type"));
        }
        callback(null, true);
    }
}).single("file");

module.exports = upload;