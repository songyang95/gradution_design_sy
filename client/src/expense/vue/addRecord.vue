<template>
    <div>
        <div class="mask" @click="close"></div>
        <div class="center wapper">
            <div class="padding">
                {{userSelectList}}
                ------
                {{expenseSelectList}}
                --------
                {{expenseIdArr}}
                --------
                {{detailList}}
                <div class="title">请选择学生(单选)</div>
                <div class="user">
                    <div>名字</div>
                    <div>性别</div>
                    <div>学号</div>
                    <div>添加</div>
                    <div>被选中</div>
                </div>
                <div class="user" v-for="(item,index) in userList">
                    <div>{{item.name}}</div>
                    <div>{{item.sex}}</div>
                    <div>{{item.number}}</div>
                    <div>
                        <span v-if="userSelectList[index] == 0" @click="changeSelectUser(index,item.id)" class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                        <span v-if="userSelectList[index] == 1" @click="changeSelectUser(index,item.id)" class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </div>
                    <div>
                        <span v-if="userSelectList[index] == 1" class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>
                        <span v-if="userSelectList[index] == 0" class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
                    </div>
                </div>
                <div v-if="selectSwitch">
                    <div class="title">请选择收费项目(多选)</div>
                    <div class="expense">
                        <div>名字</div>
                        <div>价钱</div>
                        <div>添加</div>
                        <div>被选中</div>
                    </div>
                    <div class="expense" v-for="(item,index) in trueExpenseList">
                        <div>{{item.name}}</div>
                        <div>{{item.money}}</div>
                        <div>
                            <span v-if="expenseSelectList[index] == 0" @click="changeSelectExpense(index)" class="glyphicon glyphicon-plus" aria-hidden="true"></span>
                            <span v-if="expenseSelectList[index] == 1" @click="changeSelectExpense(index)" class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        </div>
                        <div>
                            <span v-if="expenseSelectList[index] == 1" class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>
                            <span v-if="expenseSelectList[index] == 0" class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
                        </div>
                    </div>
                    <div class="save" @click="add">保存</div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    export default {
        data(){
            return {
                userList:[],

                expenseList:[],
                asyncExpenseList:[],
                trueExpenseList:[],

                userSelectList:[],
                expenseSelectList:[],

                selectSwitch:false,

                expenseIdArr:[],

                detailList:[]
            }
        },
        props:["data","detail"],
        methods:{
            changeSelectUser(index,id){
                if(this.userSelectList[index] == 1){
                    this.$set(this.userSelectList,index,0);
                    this.selectSwitch=false;
                }else if(this.userSelectList[index] == 0){
                    this.userSelectList.map((item,count) => {
                        this.$set(this.userSelectList,count,0);
                    });
                    this.$set(this.userSelectList,index,1);
                    this.selectSwitch=true;
                }
                //加载复选模块数据
                axios.get("/getExpenseByUserId?id="+ id).then( res => {
                    this.trueExpenseList=[];
                    this.asyncExpenseList=JSON.parse(res.data);
                    this.expenseList.map( (item,index) => {
                        var flag=true;
                        this.asyncExpenseList.map( (item2,index) => {
                            if(item.expense_id == item2.expense_id){
                                flag=false;
                            }
                        });
                        if(flag){
                            this.trueExpenseList.push(item);
                        }
                    } );


                    this.expenseSelectList=[];
                    this.trueExpenseList.map((item,index) => {
                        this.$set(this.expenseSelectList,index,0)
                    })
                    //初始化复选列表
                });
            },
            changeSelectExpense(index){
                if(this.expenseSelectList[index] == 1){
                    this.$set(this.expenseSelectList,index,0);
                }else if(this.expenseSelectList[index] == 0){
                    this.$set(this.expenseSelectList,index,1);
                }
            },
            close(){
                this.$emit("close",false)
            },
            add(){
                var obj={
                    'userId':0,
                    'expenseId':"",
                    "id":0
                }
                var expenseId="";
                var idArr=[];
                this.userSelectList.map( (item,index) => {
                    if(item == 1){
                        obj.userId=this.userList[index].id;
                        expenseId=this.expenseIdArr[index];
                        obj.id=this.detailList[index].id;
                    }
                })
//                console.log("expenseId",expenseId);
                this.expenseSelectList.map( (item,index) => {
                    if(item == 1){
                        console.log("this.trueExpenseList[index].expense_id",this.trueExpenseList[index].expense_id);
                        idArr.push(this.trueExpenseList[index].expense_id);
                    }
                })
                if(expenseId != "(null)"){
                    var arr=expenseId.replace("(","").replace(")","").split(",");
                    arr=arr.concat(idArr);
                    var str="(" + arr.join(",") + ")";
                    obj.expenseId=str;
                }else{
                    var str="(" + idArr.join(",") + ")";
                    obj.expenseId=str;
                }
                axios.post("/saveUserExpenseInfo",obj).then( res => {
                    if(res.data == "success"){
                        alert("添加成功");
                        window.location.href="/expense";
                    }else if(res.data == "failed"){
                        alert("添加失败");
                    }
                } )
            }
        },
        mounted(){
            this.expenseIdArr=this.data;
            this.detailList=this.detail;
            axios.get('/getAllUserAndAllExpense').then( res => {
                var data=JSON.parse(res.data);
                this.userList=data.user;
                this.expenseList=data.expense;
                this.userList.map((item,index) => {
                    this.$set(this.userSelectList,index,0)
                })
            } )
        }
    }
</script>
<style scoped lang="scss">
    .wapper{
        max-width: 640px;
        margin: 0 auto;
        font-size: 14px;
    }
    .padding{
        background: white;
        padding: 0.1rem 0.2rem;
        height: 500px;
        overflow: scroll;
        margin: 0 auto;
        div{
            width: 100%;
            margin: 0 auto;
            margin-top: 0.05rem;
        }
        .title{
            width: 100%;
            text-align: center;
            height: 0.3rem;
            line-height: 0.3rem;
            margin-left: 0;
            margin-top: 0.2rem;
        }
        .user,.expense{
            font-size: 0;
            div{
                font-size: 14px;
                vertical-align: middle;
                display: inline-block;
                width: 20%;
            }
        }
        .save{
            width: 100px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            background: #64b543;
            display: inline-block;
            border-radius: 10px;
            color: white;
            font-size: 0.12rem;
            margin-left: 0;
            margin-top: 0.2rem;
        }
    }
    .mask{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #000;
        opacity:0.7;
        z-index: 2;
    }
    .center{
        z-index: 3;
        position: fixed;
        top: 0.2rem;
        width: 100%;
    }
    span{
        font-size: 0.14rem;
    }

</style>