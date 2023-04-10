const express = require('express');
const router = express.Router();
const render = require("ejs");
const loanHelper = require('../helpers/loan.js')
const sampleBalanceSheet = require('../data/balanceSheet.json');
const { log } = require('util');
//health route 
router.get('/health', function(req,res){
    res.status(200).send("ok")
})

//index page
router.get('/', async function(req,res){
    res.render("index")
});


router.post('/fetch-balance-sheet', async function(req,res){
    var balanceSheet = loanHelper.getBalanceSheet() //this is just a snippet of geeting the balance sheet from backend, but here I have passed the sample balance sheet as provided

    res.render("reviewBalanceSheet", {balanceSheet : sampleBalanceSheet.sheet, businessData : req.body})
});

router.post('/submit-application', async function(req,res){

    var balanceSheet = req.body.balanceSheet
    var businessData = req.body.businessData

    var preAssessment = loanHelper.calculatePreAssessment(businessData, balanceSheet)
    var netProfitOrLoss = loanHelper.getNetProfitOrLoss(balanceSheet)
        

    var desicions={
        businessName : businessData.businessName,
        yearEstablished : businessData.yearEstablished, 
        netProfitOrLoss : netProfitOrLoss, 
        preAssessment : preAssessment
    }

    console.log(desicions)

    // fetch('http://localhost:8000/desicions', {
    //   method : 'POST',
    //   headers: {"Content-Type":'application/json'},
    //   body:JSON.stringify(desicions)
    // }) .then (()=>{
    //   console.log('Added')
    // })


    res.json({success : true})
});





module.exports = router;