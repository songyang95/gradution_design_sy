var user_model =require("../models/user_model.js");
var expense_model =require("../models/expense_model.js");

module.exports= {
    deleted:function (req, response, next) {
        var userId = req.query.id;
        user_model.deleted(userId,function(e,res){
            if(res){
                response.send("success");
            }else{
                response.send("failed");
            }
        })
    },
    getAllUser:function(req, response, next) {
        user_model.getAllUser(function (e,res) {
            response.render('index',{ data: JSON.stringify(res)});
        })
    },
    getUserInfoByUserId:function(req, response, next) {
        var userId = req.query.id;
        user_model.getUserInfoByUserId(userId,function (e,res) {
            response.json(JSON.stringify(res[0]));
        })
    },
    saveUserInfo:function(req, response, next) {
        var userInfo = req.body.userInfo;
        user_model.saveUserInfo(userInfo,function (e,res) {
            if(res){
                response.send("success");
            }else{
                response.send("failed");
            }
        })
    },
    addUser:function (req, response, next) {
        var userInfo = req.body.userInfo;
        user_model.addUser(userInfo,function(e,res){
            if(res){
                response.send("success");
            }else{
                response.send("failed");
            }
        })
    },
    search:function (req, response, next) {
        var searchKey = req.query.searchKey;
        user_model.search(searchKey,function(e,res){
            response.render('index',{ data: JSON.stringify(res)});
        })
    },
    getAllUserAndAllExpense:function(req, response, next) {
        var obj={
            "user":[],
            "expense":[]
        }
        user_model.getAllUser(function (e,res) {
            obj.user=res;
            expense_model.getAllExpenseOnly(function (e,res2) {
                obj.expense=res2;
                response.json(JSON.stringify(obj));
            })
        })
    },
    getExpenseByUserId:function(req, response, next) {
        var userId=req.query.id;
        user_model.getExpenseByUserId(userId,function (e,res) {
            console.log("res[0].expense_id",res[0].expense_id);
            user_model.getExpenseByExpenseId(res[0].expense_id,function (e,res2) {
                response.json(JSON.stringify(res2));
            })
        })
    },
}