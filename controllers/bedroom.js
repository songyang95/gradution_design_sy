var bedroom_model =require("../models/bedroom_model.js");
module.exports= {
    getAllBedRoom:function (req, response, next) {
        bedroom_model.getAllBedRoom(function(e,res){
            response.render('bedroom',{data:JSON.stringify(res)});
        })
    },
    addBed:function (req, response, next) {
        var bedInfo = req.body.bedInfo;
        bedroom_model.addBed(bedInfo,function(e,res){
            if(res){
                response.send("success");
            }else{
                response.send("failed");
            }
        })
    },
    getBedInfoById:function (req, response, next) {
        var id=req.query.id;
        console.log(id);
        bedroom_model.getBedInfoById(id,function(e,res){
            response.json(JSON.stringify(res[0]));
        })
    },
    saveBedInfo:function(req, response, next) {
        var bedInfo = req.body.bedInfo;
        bedroom_model.saveBedInfo(bedInfo,function (e,res) {
            if(res){
                response.send("success");
            }else{
                response.send("failed");
            }
        })
    },
    deleted_bedroom:function (req, response, next) {
        var id = req.query.id;
        bedroom_model.deleted_bedroom(id,function(e,res){
            if(res){
                response.send("success");
            }else{
                response.send("failed");
            }
        })
    },
    search_bedroom:function (req, response, next) {
        var searchKey = req.query.searchKey;
        var type = req.query.type;
        bedroom_model.search_bedroom(searchKey,type,function(e,res){
            response.render('bedroom',{data:JSON.stringify(res)});
        })
    },
}