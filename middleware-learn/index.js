const express = require("express");

// Use Morgan For Show Logs On Console
const morgan = require('morgan');


// Use Helmet For Secure HTTP Request
const helmet = require('helmet')

//Middleware Import
const logger = require("./middleware/logger");

const auth = require("./middleware/auth");

// For Validation
const Joi = require('joi');

const app = express();


// Use Routes For Categories
const categories = require("./routes/categories");
const home = require("./routes/home");
// express.json() for parsing  request on json
app.use(express.json());

// express.json() for parsing  request on key value pair 
app.use(express.urlencoded({ extended :true }));

// Serving Static Files 
// app.use(express.static("./folder_path"))


//Middleware Used
app.use(logger);
app.use(auth);

// User Morgan
app.use(morgan("tiny"))

// Use Helmet For Secure HTTP Request
app.use(helmet())

// Use Routes For HOme
app.use("/",home);
// Use Routes For Categories
app.use("/api/categories/",categories);


app.listen(8081,()=>{ console.log("Listening From 8081 Port") });