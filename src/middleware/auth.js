// const authenticate = function(req, req, next) {
//     //check the token in request header
//     //validate this token

//     next()
// }


// const authorise = function(req, res, next) {
//     // comapre the logged in user's id and the id in request
//     next()
// }
const jwt =  require("jsonwebtoken")
const userModel = require("../models/userModel")

const mid1 = function(req,res,next){
    try{
    let token = req.headers["x-auth-token"]
    if(!token)
    token = req.headers["x-auth-token"]
    if(!token)
    return res.send({status: false,msg: "token must be present"});
    
    let decodedToken = jwt.verify(token, "functionup-thorium");
    if (!decodedToken)
        return res.send({ status: false, msg: "token is invalid" });

    let userId = req.params.userId;

    if (decodedToken.userId != userId) {
        res.send({ error: " Login user is not authorized" })
    }
    next()

}catch(error){
    return res.status(404).send(error.message)
}
}
module.exports.mid1=mid1