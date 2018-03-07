var Query=require("../DBconfig/query.js");
module.exports= {
    getAllExpense:function (callback) {
        var obj={
            "expense":[],
            "detail":[]
        }
        let sql="select * from expense";
        Query(sql,function (error,res) {
            obj.expense=res;
        })
        let sql2="select * from expense_user_map as e,user as u where e.user_id=u.id";
        Query(sql2,function (error,response) {
            for(var i=0;i<response.length;i++){
                (function (i) {
                    var flag=true;
                    console.log("response[i].expense_id",response[i].expense_id);
                    let subSql="select * from expense where expense_id in " + response[i].expense_id;
                    Query(subSql,function (error,res) {
                        response[i].subData=res;

                        //判断是否全部异步完毕
                        for(var j=0;j<response.length;j++){
                            if(!response[j].subData){
                                flag=false;
                            }
                        }
                        //全部结束
                        if(flag){
                            obj.detail=response;
                            callback(error,obj);
                        }
                    })
                })(i)
            }
        })
    },
    getAllExpenseOnly:function (callback) {
        let sql="select * from expense";
        Query(sql,function (error,res) {
            callback(error,res)
        })
    },
    getExpenseInfoById:function (id,callback) {
        let sql="select * from expense where expense_id=" + id;
        Query(sql,function (error,res) {
            console.log(res);
            callback(error,res)
        })
    },
    deleted_expense:function (expense_id,callback) {
        let sql="delete from `expense` where expense_id=" + expense_id;
        Query(sql,function (error,res) {
            callback(error,res)
        })
    },
    saveExpenseInfo:function (userInfo,callback) {
        let sql="update `expense` set name='"+ userInfo.name +"',money='"+ userInfo.money +"' where expense_id="+ userInfo.id;
        console.log(sql);
        Query(sql,function (error,res) {
            callback(error,res)
        })
    },
    addExpense:function (userInfo,callback) {
        // let sql="update `user` set name='"+ userInfo.name +"',sex='"+ userInfo.sex +"',number='"+ userInfo.number +"',tel='"+ userInfo.tel  +"',address='"+ userInfo.address  +"',type='"+ userInfo.type  +"',isInSchool='"+ userInfo.isInSchool  +"',startTime='"+ userInfo.startTime  +"',endTime='"+ userInfo.endTime +"' where id="+ userInfo.id;
        let sql="insert into expense(expense_id,name,money) values(null,'"+userInfo.name+"','"+userInfo.money+"')";
        console.log(sql);
        Query(sql,function (error,res) {
            callback(error,res)
        })
    },
    saveUserExpenseInfo:function (id,userId,expenseId,callback) {
        // let sql="update `user` set name='"+ userInfo.name +"',sex='"+ userInfo.sex +"',number='"+ userInfo.number +"',tel='"+ userInfo.tel  +"',address='"+ userInfo.address  +"',type='"+ userInfo.type  +"',isInSchool='"+ userInfo.isInSchool  +"',startTime='"+ userInfo.startTime  +"',endTime='"+ userInfo.endTime +"' where id="+ userInfo.id;
        let sql="update `expense_user_map` set expense_id='" + expenseId+ "' where id=" + id +" and user_id=" + userId;
        console.log(sql);
        Query(sql,function (error,res) {
            callback(error,res)
        })
    }
}