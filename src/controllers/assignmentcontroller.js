let axios = require("axios")


let memeHandler = async function (req, res) {
    try {
        let options = {
            method: "post",
            url: `https://api.imgflip.com/caption_image?TemplateID=${memeId}&text0=${text0}&text1=${text1}&username=chewie12345&password=meme@123`
        
    }
        let result = await axios(options);
        res.send({data: result.data})
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ status:false, msg: "server error" })
    }
}

module.exports.memeHandler = memeHandler