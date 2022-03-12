const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const midware = require("../middleware/auth")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", userController.createUser)

router.post("/login", userController.login)

//The userId is sent by front end
router.get("/users/:userId",midware.mid1, userController.getUserData)
router.post("/users/:userId/posts",midware.mid1, userController.postMessage)

router.put("/users/:userId",midware.mid1, userController.updateUser)
// router.delete('/users/:userId', userController.deleteUser)

router.delete("/users/:userId",midware.mid1, userController.deleteUser)


module.exports = router;