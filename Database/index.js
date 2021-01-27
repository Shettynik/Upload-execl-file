const mysql = require("mysql");

// Create mysql connection
var mysqlConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

mysqlConnection.connect((err)=>{
    if(!err){
        console.log("Database is connected successfully !!");
    }else{
        console.log("Database connection failed");
    }
});

module.exports = mysqlConnection;