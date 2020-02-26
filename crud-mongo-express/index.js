const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/crudapp",{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
    .then( ()=> console.log("Connected To Database") )
    .catch((error) => { console.error("Coundn't Connected") })

// Create Schema
const categorySchema = new mongoose.Schema({
    category_title : String ,
    category_description : String ,
    category_status : Boolean ,
    tags : [ String ],
    created_at : { type : Date , default : Date.now },
    updated_at : { type : Date , default : Date.now }
});

// Create Model From Schema
const CategoryModel = mongoose.model("Category",categorySchema);

//Create Data
async function createCategory(){
    const category_object = new CategoryModel({
        category_title:"PHP",
        category_description:"PHP Is A Language",
        category_status:false,
        tags:["framework","cse"]
    });
    
    const new_category = await category_object.save();
    console.log(new_category);
}
createCategory();

async function getCategories(){
    const categories = await CategoryModel.find();
    console.log(categories);
}
getCategories();