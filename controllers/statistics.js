var bedroom_model =require("../models/bedroom_model.js");
module.exports= {
    getAllBedRoom:function (req, response, next) {
        bedroom_model.getAllBedRoom(function(e,res){
            response.render('bedroom',{data:JSON.stringify(res)});
        })
    },
    render:function (req, response, next) {
        response.render('statistics');
    }
}