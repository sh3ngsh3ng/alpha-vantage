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
   let candleStickData = []
   for (let candleKey in rawDailyCandleData) {
       // candleKey is the date in YYYY-MM-DD
        let candleObj = {}
        let candle = rawDailyCandleData[candleKey]
        // Date
        let year = parseInt(candleKey.slice(0, 4))
        let month = parseInt(candleKey.slice(6, 7))
        let day = parseInt(candleKey.slice(8))
        let date = new Date(year,month,day)
        let timeStamp = date.getTime()
        candleObj.x = timeStamp
        // OHLC
        let open = parseFloat(candle["1. open"])
        let high = parseFloat(candle["2. high"])
        let low = parseFloat(candle["3. low"])
        let close = parseFloat(candle["4. close"])
        let volume = parseFloat(candle["5. volume"])
        let y = [open, high, low, close]
        candleObj.y = y
        candleStickData.push(candleObj)
   }
   console.log(candleStickData)
    res.render("chart", {
        candleStickData
    })
    // res.send(candleStickData)

})


module.exports = router
