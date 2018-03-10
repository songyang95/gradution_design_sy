var Query=require("../DBconfig/query.js");
module.exports= {
    getAllUser:function (callback) {
        let sql="select * from user";
        Query(sql,function (error,res) {
            callback(error,res)
        })
    },
    getUserInfoByUserId:function (userId,callback) {
        let sql="select * from user where id=" + userId;
        Query(sql,function (error,res) {
            callback(error,res)
        })
    },
    saveUserInfo:function (userInfo,callback) {
        let sql="update `user` set name='"+ userInfo.name +"',sex='"+ userInfo.sex +"',number='"+ userInfo.number +"',tel='"+ userInfo.tel  +"',address='"+ userInfo.address  +"',type='"+ userInfo.type  +"',isInSchool='"+ userInfo.isInSchool  +"',startTime='"+ userInfo.startTime  +"',endTime='"+ userInfo.endTime +"' where id="+ userInfo.id;
        Query(sql,function (error,res) {
            callback(error,res)
        })
    },
    addUser:function (userInfo,callback) {
        // let sql="update `user` set name='"+ userInfo.name +"',sex='"+ userInfo.sex +"',number='"+ userInfo.number +"',tel='"+ userInfo.tel  +"',address='"+ userInfo.address  +"',type='"+ userInfo.type  +"',isInSchool='"+ userInfo.isInSchool  +"',startTime='"+ userInfo.startTime  +"',endTime='"+ userInfo.endTime +"' where id="+ userInfo.id;
        let sql="insert into user(id,name,sex,number,tel,address,type,isInSchool,startTime,endTime) values(null,'"+userInfo.name+"','"+userInfo.sex+"','"+userInfo.number+"','"+userInfo.tel+"','"+userInfo.address+"','"+userInfo.type+"',"+userInfo.isInSchool+",'"+userInfo.startTime+"','"+userInfo.endTime+"')";
        Query(sql,function (error,res) {
            if(res && res.insertId){
                let sql2="insert into expense_user_map(id,user_id,expense_id) values(null,'"+ res.insertId +"','(null)')";
                Query(sql2,function (error2,res2) {
                    callback(error2,res2)
                })
            }else{
                callback(error,res)
            }
        })

    },
    deleted:function (userId,callback) {
        let sql="delete from `user` where id=" + userId;
        console.log(sql)
        Query(sql,function (error,res) {
            callback(error,res)
        })
    },
    search:function (searchKey,callback) {
        let sql="select * from user where name like '%"+ searchKey +"%'";
        Query(sql,function (error,res) {
            callback(error,res)
        })
    },
    getExpenseByUserId:function (userId,callback) {
        let sql="select * from expense_user_map where user_id=" + userId;
        Query(sql,function (error,res) {
            callback(error,res)
        })
    },
    getExpenseByExpenseId:function (expenseId,callback) {
        let sql="select * from expense where expense_id in " + expenseId;
        Query(sql,function (error,res) {
            callback(error,res)
        })
    },
}