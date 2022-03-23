const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const validator = require('email-validator')

const internSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    //  mandatory},
    email: {
        required: true,
        unique: true,
        type: String
    },
    // mandatory, valid email, unique}, 
    mobile: {
        type: Number,
        unique: true,
        validate: {
            validator: function (mobile) {
                if (/^\d{10}$/.test(mobile)) {
                    return (true)
                } else {
                    alert("Invalid number, must be of ten digits")
                    number.focus()
                    return (false)
                }
            }
        }
    },

    // mobile: {
    //     required: true,
    //     unique: true,
    //     type: String
    // },
    // mandatory, valid mobile number, unique},
    collegeId: {
        type: ObjectId,
        ref: "collegeModel"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
} ,  { timestamps: true });


module.exports = mongoose.model('Intern', internSchema)