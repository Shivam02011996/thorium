const express = require('express');
const router = express.Router();
const ProjectController= require("../controllers/controllers")
const ProjectMiddleware= require("../Middleware/middleware")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/authors",ProjectController.createAuthor)

router.post("/login",ProjectController.loginUser)

router.post("/blogs",ProjectMiddleware.authorization,ProjectController.createBlog)

router.get("/blogs",ProjectMiddleware.authorization,ProjectController.getblog)

router.put("/blogs/:blogId",ProjectMiddleware.authorization,ProjectController.updateBlog)

router.delete("/deleteBlogs/:blogId",ProjectMiddleware.authorization,ProjectController.deleteBlogs)

router.delete("/deleteByQuery", ProjectMiddleware.authorization,ProjectController.deleteByQuery)

module.exports = router;
