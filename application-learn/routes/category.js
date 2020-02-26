const {Category,validate} = require("../models/category");
const express = require("express")
const router = express.Router();

router.get("/",async (request,response)=>{
    const categories = await Category.find().sort({_id:-1})
    response.send(categories);
});

router.post("/", async (request,response)=>{
    const {error} = validate(request.body) ; 
    if(error){
        return response.status(400).send(error.details);
    }else{
        let new_category = new Category({
            category_title: request.body.category_title,
            category_description: request.body.category_description,
            category_status:request.body.category_status
        });

        new_category = await new_category.save();
        response.send(new_category);
    }
    
});


router.put("/:id", async (request,response)=>{
    const {error} = validate(request.body) ; 
    if(error){
        return response.status(400).send(error.details);     
    }else{
        const category = await Category.findByIdAndUpdate(request.params.id,{
            category_title: request.body.category_title,
            category_description: request.body.category_description,
            category_status:request.body.category_status
        },{ new:true });

        if(!category){
            return response.status(404).send("Category Doesn't Exists");
        }else{
            response.send(category);
        }
    }
});


router.get("/:id", async (request,response)=>{
    const category = await Category.findById(request.params.id);
    if(!category){
        return response.status(404).send("Category Doesn't Exists");
    }else{
        response.send(category);
    }  
});

router.delete("/:id", async (request,response)=>{
    const category = await Category.findByIdAndRemove(request.params.id);
    if(!category){
        return response.status(404).send("Category Doesn't Exists");
    }else{
        response.send(category);
    }  
});


module.exports = router ; 