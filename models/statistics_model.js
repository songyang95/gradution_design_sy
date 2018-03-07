var Query=require("../DBconfig/query.js");
module.exports= {
    getAllBedRoom:function (callback) {
        let sql="select * from bedroom";
        Query(sql,function (error,res) {
            callback(error,res)
        })
    }
}