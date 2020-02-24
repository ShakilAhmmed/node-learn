const express = require("express")
// For Validation
const Joi = require('joi');

const app = express()

app.use(express.json())


let categories = [
    {
        course_id:1,
        name:"Python",
        status:"1"
    },
    {
        course_id:2,
        name:"Php",
        status:"0"
    },
    {
        course_id:3,
        name:"Laravel",
        status:"1"
    },
    {
        course_id:4,
        name:"Django",
        status:"1"
    },
];
// Get Requests
app.get("/",(request,response)=>{
    response.send("Hello I Am From Node Js");
});

// Get Requests For All Categories
app.get("/api/categories",(request,response)=>{
    return response.send(categories)
    //response.send(request.url);
});


// Get Requests For Single Categories
app.get("/api/categories/:course_id",(request,response)=>{
    // response.send(categories["course_id"])
    let category = categories.find( data => data.course_id === parseInt(request.params.course_id))
    if(!category){
        return response.status(404).send("Category Doesn't Exists");
    }else{
        response.send(category);
    }
    // for(data in categories){
    //     if(categories[data]["course_id"] == request.params.course_id ){
    //         response.send(categories[data]);
    //         break;
    //     }  
    // }
});
// Post Request With Validation 
app.post("/api/categories",(request,response)=>{
        const {error} = validation(request.body) ; 
        if(error){
            return response.status(400).send(error.details);
        }else{
            const new_category = {
                course_id:categories.length + 1 ,
                name: request.body.name,
                status:request.body.status
            };
            categories.push(new_category)
            response.send(new_category);
        }
        
});

// Update Request
app.put("/api/categories/:course_id",(request,response)=>{
    let category = categories.find( data => data.course_id === parseInt(request.params.course_id))
    if(!category){
        return response.status(404).send("Category Doesn't Exists");
    }else{
        const {error} = validation(request.body) ; 
        if(error){
            return response.status(400).send(error.details);
            
        }else{
            category.name = request.body.name ;
            category.status = request.body.status ;
            response.send(category);
        }
    }
});

// Delete Request 
app.delete("/api/categories/:course_id",(request,response)=>{
    let category = categories.find( data => data.course_id === parseInt(request.params.course_id))
    if(!category){
        return response.status(404).send("Category Doesn't Exists");
    }else{
        const index = categories.indexOf(category);
        categories.splice(index,1);
        response.send(categories);
    }
});

function validation(data){
    const validation_rules = {
        name: Joi.string().min(3).required(),
        status:Joi.number().required()
    };
    return Joi.validate(data,validation_rules);
}



app.listen(8082,()=>{ console.log("Listening From 8082 Port") });