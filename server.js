const express = require('express');
const app = express();
const routes = require('./routes');
const port = process.env.PORT || 3000;

const mongodb = require("./data/database")

app.use('/', routes)


mongodb.initDb((err)=>{
    if(err){
        console.log(err)
    }
    else{
        app.listen(port, () => { console.log(`Database is running on port ${port}`);});
    }
});
