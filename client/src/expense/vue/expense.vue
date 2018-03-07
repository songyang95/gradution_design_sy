<template>
    <div class="wapper">
        <!--{{dataList}}-->
        <!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
        <!--{{detailList}}-->
        {{expenseIdArr}}
        <detail @changeName="changeName" :count="nowDetail" v-if="flag" @close="close"></detail>
        <add v-if="addSwitch" @close="close2"></add>
        <record :detail="detailList" :data="expenseIdArr" v-if="addRecordFlag" @close="close3"></record>
        <div class="banner1" :class="{'filter' : filter}">
            <div>
                <div class="rule" >学校的各项收费标准</div>
                <div class="add" @click="add">点击添加收费记录</div>
                <div v-for="(item,index) in dataList" class="list">
                    <div class="list_no">{{index+1}}</div>
                    <div class="list_info">{{item.name}}</div>
                    <div class="list_info">{{item.money}}元</div>
                    <div class="list_edit" @click="edit(item.expense_id)"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></div>
                    <div class="list_del" @click="deleted(item.expense_id)"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></div>
                </div>
            </div>
        </div>
        <div class="banner2" :class="{'filter' : filter}">
            <div class="banner2_title">学生缴费记录<span @click="addRecord" style="margin-left: 0.2rem" class="glyphicon glyphicon-plus" aria-hidden="true"></span></div>
            <div class="lable">
                <div class="lable_no">编号</div>
                <div>姓名</div>
                <div>总支付费用</div>
                <div class="lable_idea">操作</div>
            </div>
            <div class="lable" v-for="(item,index) in detailList">
                <div class="lable_no">{{index + 1}}</div>
                <div>{{item.name}}</div>
                <div>{{item.allMoney}}元</div>
                <div class="lable_show" @click="changeShow(index)">查看更多<span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span></div>
                <div class="lable_detail" v-if="showFlagArr[index] == 1" v-for="(item2,index2) in item.subData">
                    <div>{{item2.name}}</div>
                    <div>{{item2.money}}元</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios"
    import detail from "./userDetail.vue";
    import add from "./add.vue"
    import record from "./addRecord.vue"
    export default {
        props:["data","detail"],
        data(){
            return {
                dataList:[],
                flag:false,
                nowDetail:0,
                filter:false,
                addSwitch:false,
                detailList:[],
                showFlagArr:[],
                addRecordFlag:false,
                expenseIdArr:[]
            }
        },
        methods:{
            addRecord(){
                this.addRecordFlag=true;
                this.filter=true;
            },
            changeShow(index){
                if(this.showFlagArr[index] == 1){
                    this.$set(this.showFlagArr,index,0);
                }else if(this.showFlagArr[index] == 0){
                    this.showFlagArr.map((item,count) => {
                        this.$set(this.showFlagArr,count,0);
                    });
                    this.$set(this.showFlagArr,index,1);
                }
            },
            add(){
                this.addSwitch=true;
                this.filter=true;
            },
            changeName(value){
                var _this=this;
                this.dataList.map(function (item,index) {
                    if(item.expense_id == value.id){
                        _this.data[index].name=value.name;
                        _this.data[index].money=value.money;
                    }
                })
            },
            edit(number){
                this.flag=true;
                this.nowDetail=number;
                this.filter=true;
            },
            close(value){
                this.flag=value;
                this.filter=false;
            },
            close2(value){
                this.addSwitch=value;
                this.filter=false;
            },
            close3(value){
                this.addRecordFlag=value;
                this.filter=false;
            },
            deleted(id){
                var _this=this;
                axios.get("/deleted_expense?id="+id)
                    .then(function (res) {
                        if(res.data == "success"){
                            alert("删除成功");
//                            console.log("_this.data",_this.data);
                            _this.dataList.map(function (item,index) {
                                if(item.expense_id == id){
                                    console.log("_this.data",_this.dataList);
                                    _this.dataList.splice(index,1);
                                    console.log("_this.data",_this.dataList);
                                }
                            })
                        }else if(res.data == "failed"){
                            alert("删除失败");
                        }
                    })
            },
        },
        components:{
            detail:detail,
            add:add,
            record:record
        },
        mounted(){
            var _this=this;
            this.dataList=this.data;
            this.detailList=this.detail;
            this.detailList.map(function (item,index) {
                _this.$set(_this.showFlagArr,index,0);
                var allMoney=0;
                item.subData.map(function (item2,index2) {
                    allMoney+=parseInt(item2.money);
                });
                item.allMoney=allMoney;
                _this.$set(_this.expenseIdArr,index,item.expense_id);
            })
        }
    }
</script>
<style scoped lang="scss">
    .wapper{
        max-width: 640px;
        margin: 0 auto;
        font-size: 14px;
        div{
            width: 100%;
            text-align: center;
        }
        .rule{
            margin-bottom: 0.2rem;
        }
        .add{
            cursor: pointer;
        }
        .list{
            font-size: 0;
            div{
                display: inline-block;
                vertical-align: middle;
                font-size: 14px;
                text-align: center;
                height: 0.2rem;
                line-height: 0.2rem;
            }
            .list_info{
                width: 35%;
            }
            .list_no,.list_edit,.list_del{
                width: 10%;
            }
        }
        .banner1{
            border-bottom: 1px solid black;
        }
        .banner2{
            .banner2_title{
                margin-top: 0.1rem;
                margin-bottom: 0.1rem;
            }
            .lable{
                font-size: 0;
                div{
                    vertical-align: middle;
                    font-size: 14px;
                    display: inline-block;
                    width: 35%;
                }
                .lable_no{
                    width: 10%;
                }
                .lable_idea{
                    width: 20%;
                }
                .lable_show{
                    width: 20%;
                    border-radius: 10px;
                    background: tan;
                    color:white;
                    span{
                        vertical-align: middle;
                    }
                }
                .lable_detail{
                    width: 80%;
                    padding-left: 20%;
                    font-size: 0;
                    div{
                        display: inline-block;
                        vertical-align: middle;
                        font-size: 14px;
                        width: 50%;
                    }
                }
            }
        }
    }
    .filter{
        filter:blur(5px);
        transition: 0.6s filter;
    }

</style>