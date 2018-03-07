<template>
    <div>
        <div class="mask" @click="close"></div>
        <div class="center wapper">
            <div class="padding">
                <div class="title">编辑收费信息</div>
                <el-input placeholder="请输入名称" v-model="name">
                    <template slot="prepend">名称</template>
                </el-input>
                <el-input placeholder="请输入价钱" v-model="money">
                    <template slot="prepend">价格</template>
                    <template slot="append">元</template>
                </el-input>
                <div class="save" @click="save">保存</div>
            </div>

        </div>
    </div>
</template>
<script>
    import axios from "axios";
    export default {
        data(){
            return {
                id:0,
                name:"",
                money:"",
            }
        },
        props:["count"],
        methods:{
            close(){
                this.$emit("close",false)
            },
            save(){
                var _this=this;
                var obj={
                    "userInfo":{
                        id:this.id,
                        name:this.name,
                        money:this.money,
                    }
                };
                axios.post("/saveExpenseInfo",obj).then(function (res) {
                    if(res.data == "success"){
                        alert("保存成功");
                        _this.$emit("changeName",{
                            "name":_this.name,
                            "money":_this.money,
                            "id":_this.id
                        });
                    }else if(res.data == "failed"){
                        alert("保存失败");
                    }
                })
            }
        },
        mounted(){
            var _this=this;
            axios.get("/getExpenseInfoById?id="+ this.count)
                .then(function (res) {
                var data=JSON.parse(res.data);
                _this.id=data.expense_id;
                _this.name=data.name;
                _this.money=data.money;
            })
        }
    }
</script>
<style scoped lang="scss">
    .wapper{
        max-width: 640px;
        margin: 0 auto;
        font-size: 0.14rem;
    }
    .padding{
        background: white;
        padding: 0.1rem 0.2rem;
        margin: 0 auto;
        div{
            width: 100%;
            margin: 0 auto;
            margin-top: 0.1rem;
        }
        .title{
            width: 100%;
            text-align: center;
            height: 0.3rem;
            line-height: 0.3rem;
            margin-left: 0;
            margin-bottom: 0.2rem;
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
        z-index:2;
    }
    .center{
        z-index: 3;
        position: fixed;
        top: 0.2rem;
    }
</style>