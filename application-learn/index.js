const express = require("express")
const mongoose = require("mongoose");
const category = require("./routes/category");
const app = express()
// Database Connection
mongoose.connect("mongodb://localhost/application",{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
    .then( ()=> console.log("Connected To Database") )
    .catch((error) => { console.error("Coundn't Connected") })


app.use(express.json())
// express.json() for parsing  request on key value pair 
app.use(express.urlencoded({ extended :true }));

// Category Route
app.use("/category",category);

app.listen(8081,()=>{ console.log("Connected To 8081")})
