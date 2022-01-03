const express = require("express")
const router = express.Router()
const axios = require("axios")

// daily charts
router.get("/:ticker", async(req,res) => {
    let stock = req.params.ticker
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${process.env.API_KEY}`
    let axiosConfig = {
        json: true,
        headers: {
            'User-Agent': 'request'
        }
    }
    let response = await axios.get(url, axiosConfig)
    let rawDailyCandleData = response.data["Time Series (Daily)"]
    console.log(rawDailyCandleData)
    /* 
        RAW DATA => 
        '2021-08-11': {
            '1. open': '141.7800',
            '2. high': '142.7685',
            '3. low': '141.5000',
            '4. close': '142.1300',
            '5. volume': '4259952'
        }

        Transform to => 
        [{
            x: new Date(YYYY, MM, DD)
            y: [O,H,L,C]
        }]
    */
    res.render("chart")

})


module.exports = router
