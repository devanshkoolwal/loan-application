const express = require('express');
const bodyParser = require("body-parser");
const render = require("ejs");
const loanApplicationRoutes = require('./routes/loanApplication');

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use('/',loanApplicationRoutes);

app.listen(process.env.PORT || '8000', function(){
    if(process.env.PORT){
        console.log("App is listening at " + process.env.PORT);
    }
    else{
        console.log("App is listening at 8000");
    }
});


