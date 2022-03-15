const express = require('express');
const router = express.Router();
const ProjectController= require("../controllers/controllers")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/authors",ProjectController.createAuthor)
router.post("/blogs",ProjectController.createBlog)
router.get("/blogs",ProjectController.getblog)
router.put("/blogs/:blogId",ProjectController.updateBlog)
router.delete("/deleteBlogs/:blogId",ProjectController.deleteBlogs)
router.delete("/deleteByQuery",ProjectController.deleteByQuery)

module.exports = router;