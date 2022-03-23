const express = require('express');
const router = express.Router();
const controller= require("../controllers/controller")
//const ProjectMiddleware= require("../Middleware/middleware")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/college",controller.createCollege)

router.post("/interns",controller.createDocument)

router.get("/collegeDetails",controller.getCollegeDetails)

module.exports = router;
