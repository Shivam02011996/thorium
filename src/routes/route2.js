const express = require('express');
const router = express.Router();


router.get("/get-query-1", function (req, res) {
    let data = req.query
    console.log(data)
    res.send({ data: data, status: true })
})



module.exports = router;