require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

// Importing routes
const paths = require("./routes");

const app = express();

// Setting middlewars
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static("public"));
app.use("/",paths);

// Letting server to listen on port
const PORT = process.env.PORT || 8080;
app.listen(PORT, (req, res)=>{
    console.log(`Server is up and running on port ${PORT}`);
});