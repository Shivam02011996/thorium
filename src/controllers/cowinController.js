let axios = require("axios")

let getStates = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getOtp = async function (req, res) {
    try {
        let blahhh = req.body

        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let sessionInDistrict = async function (req, res) {
    try {
        let districtId = req.query.district_id
        let date = req.query.date
        console.log(`query params are: ${districtId} ${date}`)
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${date}`
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}



let weatherOfLondon = async function (req, res) {
    try {
        let q = req.query.city
        let appid = req.query.id
        console.log(`query params are: ${q} ${appid}`)
        let options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${id}`
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}





let sortTheCities = async function (req, res) {
    try {
        let cities = ["Bengaluru","Pune","Delhi","Hyderabad","London"];
        let ObjCities=[];
        
        for(i=0; i<cities.length; i++){
            let obj= { city: cities[i] }
        let result = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=5c5ed96b9361a5c37efcbaee6a24fe8f`)
         console.log(result.data.main.temp) 

        obj.temp=result.data.main.temp
        ObjCities.push(obj)
        }
        let sorted =ObjCities.sort( function(a, b) {return a.temp , b.temp})
        console.log(sorted)
        res.status(200).send({status: true, data:ObjCities})
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


module.exports.getStates = getStates
module.exports.getDistricts = getDistricts
module.exports.getByPin = getByPin
module.exports.getOtp = getOtp
module.exports.sessionInDistrict = sessionInDistrict
module.exports.weatherOfLondon = weatherOfLondon
module.exports.sortTheCities = sortTheCities