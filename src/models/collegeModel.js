const mongoose = require('mongoose');


const collegeSchema = new mongoose.Schema({ 
    name: { 
        required: true,
        unique: true,
        type: String
    },
       // mandatory, unique, example iith}, 
    fullName: {
        required: true,
        type: String
    },
      //  mandatory, example `Indian Institute of Technology, Hyderabad`}, 
    
    logoLink: {
        required: true,
        type: String
    },
       // mandatory},
    
    isDeleted: {
        type: Boolean,
         default: false
        }
     } ,  { timestamps: true });


    

module.exports = mongoose.model('College', collegeSchema)
