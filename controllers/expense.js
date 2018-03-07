var expense_model =require("../models/expense_model.js");
module.exports= {
    getAllExpense:function (req, response, next) {
        expense_model.getAllExpense(function(e,res){
            // console.log("res",res);
            response.render('expense',{
                data: JSON.stringify(res.expense),
                detail: JSON.stringify(res.detail)
            });
        })
    },
    getExpenseInfoById:function (req, response, next) {
        var id=req.query.id;
        expense_model.getExpenseInfoById(id,function(e,res){
            response.json(JSON.stringify(res[0]));
        })
    },
    deleted_expense:function (req, response, next) {
        var expense_id = req.query.id;
        expense_model.deleted_expense(expense_id,function(e,res){
            if(res){
                response.send("success");
            }else{
                response.send("failed");
            }
        })
    },
    saveExpenseInfo:function(req, response, next) {
        var userInfo = req.body.userInfo;
        expense_model.saveExpenseInfo(userInfo,function (e,res) {
            if(res){
                response.send("success");
            }else{
                response.send("failed");
            }
        })
    },
    addExpense:function (req, response, next) {
        var userInfo = req.body.userInfo;
        expense_model.addExpense(userInfo,function(e,res){
            if(res){
                response.send("success");
            }else{
                response.send("failed");
            }
        })
    },
    saveUserExpenseInfo:function (req, response, next) {
        var userId = req.body.userId;
        var id = req.body.id;
        var expenseId = req.body.expenseId;
        expense_model.saveUserExpenseInfo(id,userId,expenseId,function(e,res){
            if(res){
                response.send("success");
            }else{
                response.send("failed");
            }
        })
    },
}