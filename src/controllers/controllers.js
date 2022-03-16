const AuthorModel = require("../models/AuthorModel")
const BlogModel = require("../models/BlogModel")
const validator = require("email-validator");
const jwt = require("jsonwebtoken")

const createAuthor = async function (req, res) {
    try {
        let author = req.body
        if (Object.entries(author).length === 0) {
            res.status(400).send({ status: false, msg: "Kindly pass some data " })
        }
        else {
            let email = req.body.email
            if(!email)
               return res.status(400).send({status: false,msg : "Enter Valid Email"})


            let check = validator.validate(email);
            if (!check) {
                return res.status(400).send({ status: false, msg: "Enter a valid email id" })
            }
            let mail = await AuthorModel.findOne({ email })
            if (mail) {
                return res.status(409).send({ status: false, msg: "Enter Unique Email Id." })
            }

            let authorCreated = await AuthorModel.create(author)
            res.status(201).send({ status: true, data: authorCreated })

        }
    }

    catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: error.message })
    }

}

const loginUser = async function (req, res) {
    try {
         let data = req.body
         if (Object.entries(data).length === 0) {
              return res.status(400).send({ status: false, msg: "Kindly pass some data " })
         }

         let username = req.body.email
         let password = req.body.password

         if(!username)
              return res.status(400).send({status: false,msg : "Enter Valid Email"})

         if(!password)
         return res.status(400).send({status: false,msg : "Enter Valid Password"})


         let user = await AuthorModel.findOne({ email: username, password: password })

         if (!user) {
              return res.status(400).send({ status: false, msg: "Credentials don't match,Please Check and Try again" })
         }

         let token = jwt.sign({
              userId: user._id.toString(),
              batch: "thorium",
         }, "Project_1")
         res.setHeader("x-api-key", token);
         res.status(201).send({ status: true, data: token })

    }
    catch (error) {
         console.log(error)
         res.status(500).send({ status: false, msg: error.message })
    }
}



const createBlog = async function (req, res) {
    try {
        let blog = req.body
        if (Object.entries(blog).length === 0) {
            res.status(400).send({ status: false, msg: "Kindly pass some data " })
        }
        else {
            let authorId = req.body.authorId
            if(!authorId)
               return res.status(400).send({status: false,msg : "Author Id Not Present"})

            let author = await AuthorModel.findById(authorId)
            if (!author) {
                res.status(400).send({ status: false, msg: "No Such Author is Present,Please check authorId" })
            }
            else {
                let blogCreated = await BlogModel.create(blog)
             return res.status(201).send({ status: true, data: blogCreated })
            }
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: error.message })
    }
}
const getblog = async function (req, res) {

    try {
        let input = req.query
          if (!input)
               return res.status(400).send({ status: false, msg: "Please Send Some Filters" })


        let allblogs = await BlogModel.find(input)
        if (!allblogs) {
            return res.status(404).send({ status: false, msg: "No such blog exists" });
        }
        else {
            res.status(200).send({ status: true, msg: allblogs });
        }

    }
    catch (err) {
        console.log("this is the error:", err.message)
        res.status(500).send({ status: false, msg: err.message })
    }
};

const updateBlog = async function (request, response) {
    try {
        const id = request.params.blogId;
        if (!id)
               return res.status(400).send({ status: false, msg: "Please Send Blog ID" })

        const data = request.body;
        if (Object.entries(data).length === 0) {
            res.status(400).send({ status: false, msg: "Kindly pass some data " })
       }
        const fetchData = await BlogModel.findOne({id,isDeleted:false});
        if (!fetchData) {
            return response.status(404).send({
                status: false,
                msg: 'No such blog exists'
            });
        }
        data.publishedAt = new Date();
        data.isPublished = true
        const dataRes = await BlogModel.findByIdAndUpdate(request.params.blogId, data, {
            new: true
        });
        return response.status(200).send({
            status: true,
            msg: dataRes
        });
    } catch (error) {
        console.log("this is the error:", error.message)
        return response.status(500).send({
            status: false,
            'Error: ': error.message
        });
    }

}

const deleteBlogs = async function (req, res) {
    try {
        let blogId = req.params.blogId;
        if (!blogId)
               return res.status(400).send({ status: false, msg: "Blog ID is not valid" })

        let blogInfo = await BlogModel.findOne({blogId,isDeleted: false});
        if (!blogInfo)
            return res.status(404).send({ status: false, msg: "No such blog exists" });

        
        let deleteBlogs = await BlogModel.findOneAndUpdate({ _id: blogId }, { $set: { isDeleted: true } }, { new: true });
        res.status(200).send({ status: true, data: deleteBlogs });


    }

    catch (error) {
        console.log(error.message)
        res.status(500).send({ status: true, msg: error.message })
    }
};

const deleteByQuery = async function (request, response) {

    try {
         const data = request.query;
         if (!data)
         return res.status(400).send({ status: false, msg: "Please Send Some Data" })

         const fetchData = await BlogModel.findOne({data,isDeleted:false});
         if (!fetchData) {
            return response.status(404).send({
                 status: false,
                 msg: 'Blog not found ! '
            });
       }
         
         const dataRes = await BlogModel.findOneAndUpdate(data, { isDeleted: true });
         return response.status(200).send({
              status: true,
              data: dataRes
         });
    } catch (error) {
        console.log("this is the error:", error.message)
         return response.status(500).send({
              'Error: ': error.message
         });
    }
}


module.exports.createAuthor=createAuthor
module.exports.loginUser = loginUser
module.exports.createBlog=createBlog
module.exports.getblog=getblog
module.exports.updateBlog=updateBlog
module.exports.deleteBlogs=deleteBlogs
module.exports.deleteByQuery=deleteByQuery