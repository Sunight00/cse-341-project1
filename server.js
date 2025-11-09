const express = require('express');
const app = express();
const routes = require('./routes');
const port = process.env.PORT || 3000;

const mongodb = require("./data/database");
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use("/", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-control-Allow-Methods", "Origin", "X-Requested-With, Content-Type, Accept, Z-Key");
    res.setHeader("Access-control-Allow-Headrs", "GET, POST, PUT, DELETE, OPTIONS");
    next();
})
app.use('/', routes)


mongodb.initDb((err)=>{
    if(err){
        console.log(err)
    }
    else{
        app.listen(port, () => { console.log(`Database is running on port ${port}`);});
    }
});
