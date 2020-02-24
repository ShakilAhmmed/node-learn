const express = require("express")
const router = express.Router();



// Get Requests
router.get("/",(request,response)=>{
    response.send("Hello I Am From Node Js");
});

module.exports = router;