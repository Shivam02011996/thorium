const UserModel= require("../models/userModel")

// const createUser= async function (req, res) {
//     let data= req.body
//     let savedData= await UserModel.create(data)
//     res.send({msg: savedData})
// }

// const getUsersData= async function (req, res) {
//     let allUsers= await UserModel.find()
//     res.send({msg: allUsers})
// }

      const feeds= async function (req, res) {
         let allUsers= await UserModel.find()
         res.send({msg: allUsers})
     }

     const profileDetails= async function (req, res) {
        let allProfile= await UserModel.find()
        res.send({msg: allProfile})
    }
     
     const friendList= async function (req, res) {
        let allFriend= await UserModel.find()
        res.send({msg: allFriend})
    }

     const changePassword= async function (req, res) {
        let allChange= await UserModel.find()
        res.send({msg: allChange})
    }

    const requestTime= async function (req, res) {
        let allRequest= await UserModel.find()
        res.send({msg: allRequest})
    }



module.exports.feeds= feeds
module.exports.profileDetails= profileDetails
module.exports.friendList= friendList
module.exports.changePassword= changePassword
module.exports.requestTime= requestTime