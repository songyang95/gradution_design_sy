//base
var express = require('express');
var router = express.Router();
var formidable = require("formidable");
var request=require("request");
var Query=require("../DBconfig/query.js");
var fs = require("fs");

//controllers
var user =require("../controllers/user.js");
var expense = require("../controllers/expense.js");
var bedroom = require("../controllers/bedroom.js");
var statistics= require("../controllers/statistics.js")
//router
router.get('/index',user.getAllUser);
router.get('/expense',expense.getAllExpense);
router.get('/getUserInfoByUserId',user.getUserInfoByUserId);
router.post('/saveUserInfo',user.saveUserInfo);
router.post('/saveExpenseInfo',expense.saveExpenseInfo);
router.post('/saveBedInfo',bedroom.saveBedInfo);
router.get('/deleted',user.deleted);
router.get('/deleted_expense',expense.deleted_expense);
router.get('/deleted_bedroom',bedroom.deleted_bedroom);
router.post('/addUser',user.addUser);
router.post('/addBed',bedroom.addBed);
router.post('/addExpense',expense.addExpense);
router.post('/saveUserExpenseInfo',expense.saveUserExpenseInfo);
router.get('/search',user.search);
router.get('/search_bedroom',bedroom.search_bedroom);
router.get('/getExpenseInfoById',expense.getExpenseInfoById);
router.get('/getBedInfoById',bedroom.getBedInfoById);
router.get('/getAllUserAndAllExpense',user.getAllUserAndAllExpense);
router.get('/getExpenseByUserId',user.getExpenseByUserId);
router.get('/bedroom',bedroom.getAllBedRoom);
router.get('/statistics',statistics.render);



module.exports = router;
