const mongoose = require("mongoose")
const Joi = require('joi');

const Category =mongoose.model("Category",{
    category_title : { type:String , require :true },
    category_description : String,
    category_status : Boolean,
    created_at :{ type:Date, default:Date.now },
    updated_at :{ type:Date, default:Date.now },
});

function validation(data){
    const validation_rules = {
        category_title: Joi.string().min(3).required(),
        category_description: Joi.string(),
        category_status:Joi.required()
    };
    return Joi.validate(data,validation_rules);
}

exports.Category = Category ;
exports.validate = validation;