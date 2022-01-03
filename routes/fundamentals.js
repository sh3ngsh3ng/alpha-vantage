const express = require("express")
const router = express.Router()
const axios = require("axios")

// income statement route
router.get("/:ticker/income-statement", async(req,res) => {
    let stock = req.params.ticker
    let url = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=
                ${stock}&apikey=
                ${process.env.API_KEY}`
    let axiosConfig = {
        json: true,
        headers: {
            'User-Agent': 'request'
        }
    }
    let response = await axios.get(url, axiosConfig)
    let annualReports = response.data.annualReports
    let quarterlyReports = response.data.quarterlyReports
    res.render("income_statement", {
        annualReports, quarterlyReports, stock
    })
})

module.exports = router