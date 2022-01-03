const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
const axios = require("axios")
const fs = require("fs")
require("dotenv").config();

// create an instance of express app
let app = express();

// set the view engine
app.set("view engine", "hbs");

// static folder
app.use(express.static("public"));

// setup wax-on
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

// enable forms
app.use(
  express.urlencoded({
    extended: false
  })
);

// pass watchlists to response object
app.use(function(req,res,next) {
    csv = fs.readFileSync("./public/Watchlist.csv")
    let array = csv.toString().split("\r");
    let result = array.map(function(ticker) {
        if (ticker.slice(0,1) == "\n") {
            return ticker.slice(1)
        } else {
            return ticker
        }
    })
    res.locals.stocks = result
    next()
})



let BASE_URL = "https://www.alphavantage.co/"


const fundamentalsRoutes = require("./routes/fundamentals")
const chartRoutes = require("./routes/chart")

async function main() {

    app.get("/", (req,res) => {
        res.render("main")
    })

    

    app.use("/fundamentals", fundamentalsRoutes)
    app.use("/chart", chartRoutes)
    
}

main();

app.listen(3000, () => {
  console.log("Server has started");
});