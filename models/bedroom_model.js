var Query=require("../DBconfig/query.js");
module.exports= {
    getAllBedRoom:function (callback) {
        let sql="select * from bedroom";
        Query(sql,function (error,res) {
            callback(error,res)
        })
    },
    addBed:function (bedInfo,callback) {
        // let sql="update `user` set name='"+ userInfo.name +"',sex='"+ userInfo.sex +"',number='"+ userInfo.number +"',tel='"+ userInfo.tel  +"',address='"+ userInfo.address  +"',type='"+ userInfo.type  +"',isInSchool='"+ userInfo.isInSchool  +"',startTime='"+ userInfo.startTime  +"',endTime='"+ userInfo.endTime +"' where id="+ userInfo.id;
        let sql="insert into bedroom(id,area,house,door,bed) values(null,'"+bedInfo.area+"','"+bedInfo.house+"','"+bedInfo.door+"','"+bedInfo.bed+"')";
        console.log(sql);
        Query(sql,function (error,res) {
            callback(error,res)
        })
    },
    getBedInfoById:function (id,callback) {
        let sql="select * from bedroom where id=" + id;
        Query(sql,function (error,res) {
            console.log(res);
            callback(error,res)
        })
    },
    saveBedInfo:function (bedInfo,callback) {
        let sql="update `bedroom` set area='"+ bedInfo.area +"',house='"+ bedInfo.house +"',door='"+ bedInfo.door +"',bed='"+ bedInfo.bed +"' where id="+ bedInfo.id;
        console.log(sql);
        Query(sql,function (error,res) {
            callback(error,res)
        })
    },
    deleted_bedroom:function (id,callback) {
        let sql="delete from `bedroom` where id=" + id;
        Query(sql,function (error,res) {
            callback(error,res)
        })
    },
    search_bedroom:function (searchKey,type,callback) {
        let sql="";
        if(type == 0){
            sql="select * from bedroom";
        }else if(type == 1){
            sql="select * from bedroom where area like '%"+ searchKey +"%'"
        }else if(type == 2){
            sql="select * from bedroom where house like '%"+ searchKey +"%'"
        }else if(type == 3){
            sql="select * from bedroom where door like '%"+ searchKey +"%'"
        }else if(type == 4){
            sql="select * from bedroom where bed like '%"+ searchKey +"%'"
        }
        Query(sql,function (error,res) {
            callback(error,res)
        })
    },
}