const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const blogsmodel = new mongoose.Schema( {
    title: { 
        type:String,
        required:true
         },
    body: {
     type:String,
     required :true
    },
    authorId: {
        type:ObjectId,
        required:true,
        ref:"AuthorModel"
    },
    tags: { 
        type:[String]
    },
    category: {
        type:[],
         required:true,
    },
    subcategory: {
        type:[],
        
    },
    isDeleted: { 
        type:Boolean,
         default: false 
        },
    isPublished: {
        type:Boolean,
         default: false }

}, { timestamps: true });   
   
module.exports = mongoose.model('Blog', blogsmodel)