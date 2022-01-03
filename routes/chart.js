const express = require("express")
const router = express.Router()
const axios = require("axios")

// daily charts
router.get("/:ticker", async(req,res) => {
    // let stock = req.params.ticker
    // let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${process.env.API_KEY}`
    // let axiosConfig = {
    //     json: true,
    //     headers: {
    //         'User-Agent': 'request'
    //     }
    // }
    // let response = await axios.get(url, axiosConfig)
    console.log("called")
    res.render("chart")

})


module.exports = router
