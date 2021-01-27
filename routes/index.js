const express = require("express");
const xlstojson = require("xls-to-json-lc");
const xlsxtojson = require("xlsx-to-json-lc");
const db = require("../Database");
const upload = require("../multer/multer");
const router = express.Router();

router.get("/",(req, res)=>{
    const sql = `SELECT * FROM students`;
    db.query(sql,(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("index",{data:data});
        }
    });
});

router.post("/",(req, res)=>{
    var exceltojson;
    upload(req, res, (err)=>{
        if(err){
            res.json({error_code:1, err_desc:err});
            return;
        }
        if(!req.file){
            res.json({error_code:1, err_desc:"No file passed"});
            return ;
        }
        // Checking the uploaded file extension and assaigning the required package
        if(req.file.originalname.split(".")[req.file.originalname.split(".").length-1]==="xlsx"){
            exceltojson = xlsxtojson;
        }else{
            exceltojson = xlstojson;
        }
        
        try{
            exceltojson({
                input: req.file.path,
                output: null,
                lowerCaseHeaders: true
            },function(err,results){
                if(err){
                    return res.json({error_code:1, err_desc:err, data:null})
                }
                else{
                    var sql = "INSERT INTO students(name,roll_no,class) VALUES(?,?,?)";
                    results.forEach((result)=>{
                        try{
                            const row =  db.query(sql,[result.name,result.roll_no,result.class]);
                        }catch(err){
                            console.log("Data Insertion Failed !!");
                        }
                    })
                    res.redirect("/");
                }
            });
        } catch(e){
            res.json({error_code:1, err_desc:"Corrupted excel file"});
        }
    });
});

router.post("/search", (req, res)=>{
    try{
        var {name,roll_no} = req.body;
        if(name && roll_no){
            var sql = `SELECT * FROM students WHERE name=? AND roll_no=?`;
        }else if(name || roll_no){
            var sql = `SELECT * FROM students WHERE name=? OR roll_no=?`;
        }
        db.query(sql,[name,roll_no],(err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                res.render("index",{data:data});
            }
        });
    }catch(err){
        console.log("Error !!");
    }
});


module.exports = router;