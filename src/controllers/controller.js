const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const validator = require("email-validator");
const express = require("express");
const res = require("express/lib/response");


const createCollege = async function (req, res) {
    try {
        let data = req.body
        if (Object.entries(data).length === 0) {
            res.status(400).send({ status: false, msg: "Kindly pass some data " })
        }
        else {
            let name = req.body.name
            if (!name)
                return res.status(400).send({ status: false, msg: "Enter Valid name" })

                let fullName = req.body.fullName
            if (!fullName)
                return res.status(400).send({ status: false, msg: "Enter Valid fullName" })

                let logoLink = req.body.logoLink
            if (!logoLink)
                return res.status(400).send({ status: false, msg: "Enter Valid logoLink" })


           
            let doc = await collegeModel.findOne({ name, fullName, logoLink})
            if (doc) {
                return res.status(400).send({ status: false, msg: "Credentials don't match,Please Check and Try again" })
            }

            let collegedoc = await collegeModel.create(data)
            res.status(201).send({ status: true, data: collegedoc })

        }
    }

    catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: error.message })
    }

}




const createDocument = async function (req, res) {
    try {
        let interndata = req.body
        if (Object.entries(interndata).length === 0) {
            res.status(400).send({ status: false, msg: "Kindly pass some data " })
        }
        else {
                let name = req.body.name
                if (!name)
                    return res.status(400).send({ status: false, msg: "Enter Valid name" })
    
            let email = req.body.email
           if(!email)
            return res.status(400).send({ status: false, msg: "emailId Not Present" })
        
            let check = validator.validate(email);
               if (!check) {
                    return res.status(400).send({ status: false, msg: "Enter a valid email id" })
               }
                    let mail = await internModel.findOne({ email })
               if (mail) {
                    return res.status(409).send({ status: false, msg: "Enter Unique Email Id." })
               }

          let mobile = req.body.mobile
            if(!mobile)
             return res.status(400).send({ status: false, msg: "mobile Not Present" })
            }

               let collegeId = req.body.collegeId
               if (!collegeId)
                   return res.status(400).send({ status: false, msg: "college Id Not Present" })
   
            let intern = await collegeModel.findById(collegeId)
            if (!intern) {
                return res.status(400).send({ status: false, msg: "No Such intern is Present,Please check collegeId" })
            }
            else {
                let internDataCreated = await internModel.create(interndata)
                return res.status(201).send({ status: true, data: internDataCreated })
            }
        }
    
    
    catch (error) {
        console.log(error.message)
        res.status(500).send({ status: false, msg: error.message })
    }
}






const getCollegeDetails = async function (req, res) {
    try {
        let collegename = req.query.collegeName
        if(!collegename){
            return res.status(400).send({status:false,  msg: "college name must be present"})
        }
        let dataOne = await collegeModel.findOne({ name: collegename })
        let data = JSON.parse(JSON.stringify(dataOne))
        const C_id = dataOne._id
        if (!dataOne) {
           return res.status(403).send({ status: false, message: "The value is Invalid" });
        }
        let interns = await internModel.find({ collegeId:C_id}).select({_id:true,name:true,email:true,mobile:true})
         data = {name:dataOne.name,fullName:dataOne.fullName,logoLink:dataOne.logoLink}
        data.interest = [...interns]
        res.status(200).send({status:true,data:data});
    }
        catch (err) {
            console.log(err)
            res.status(500).send({status:false , message: err.message })
        }
    }





module.exports.createCollege = createCollege
module.exports.createDocument = createDocument
module.exports.getCollegeDetails = getCollegeDetails
