const request = require('request');
const util = require("util");

async function getBalanceSheet() {
    try {
        url = "http://localhost:5000/balance-sheet"
        const requestPromise = util.promisify(request);
        const response = await requestPromise(url);
        if(response.statusCode == 200)
            return JSON.parse(response.body);
    } catch (error) {
        console.log(error);
    }
    return {}
};

function calculatePreAssessment(businessData, balanceSheet){

    var preAssessment = 20
    var netProfitOrLoss=0
    var netAssestsValue=0
    var inProfit = false
    var loanAmount = 0
    var count =0
    
    loanAmount = parseInt(businessData.loanAmount)
    balanceSheet.map((sheet)=>{
        netProfitOrLoss = netProfitOrLoss + sheet.profitOrLoss
        netAssestsValue = (netAssestsValue + sheet.assetsValue)
        if (sheet.month>0 && sheet.month<=12){
            inProfit = true
        }
        count++
    })
    var averageAssetsValue = netAssestsValue/count
    if(inProfit){    
        if(netProfitOrLoss>0 && !(averageAssetsValue>loanAmount)){
                preAssessment = 60
            }
        else if (averageAssetsValue>loanAmount){
                preAssessment = 100
            }
    }

    return preAssessment

}

function getNetProfitOrLoss(balanceSheet){
    var netProfitOrLoss = 0
    balanceSheet.map((sheet)=>{
        netProfitOrLoss = netProfitOrLoss + sheet.profitOrLoss
    })
    return netProfitOrLoss
}


module.exports = { getBalanceSheet, calculatePreAssessment, getNetProfitOrLoss} 