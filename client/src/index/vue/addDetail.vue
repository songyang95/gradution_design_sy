<template>
    <div>
        <div class="mask" @click="close"></div>
        <div class="center wapper">
            <div class="padding">
                <div class="title">添加学生信息</div>
                <el-input placeholder="请输入名字" v-model="name">
                    <template slot="prepend">姓名</template>
                </el-input>
                <el-input placeholder="请输入名字" v-model="sex">
                    <template slot="prepend">性别</template>
                </el-input>
                <el-input placeholder="请输入名字" v-model="number">
                    <template slot="prepend">学号</template>
                </el-input>
                <el-input placeholder="请输入名字" v-model="tel">
                    <template slot="prepend">电话</template>
                </el-input>
                <el-input placeholder="请输入名字" v-model="address">
                    <template slot="prepend">住址</template>
                </el-input>
                <el-input placeholder="请输入名字" v-model="type">
                    <template slot="prepend">主修艺术类别</template>
                </el-input>
                <div class="switch">
                    <span>是否住校</span>
                    <el-switch
                            v-model="isInSchool"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </div>
                <div class="group">
                    <div class="lable">学习开始时间</div>
                    <el-date-picker
                            v-model="startTime"
                            type="date"
                            :editable="false"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        <template slot="prepend">生日</template>
                    </el-date-picker>
                </div>
                <div class="group">
                    <div class="lable">学习结束时间</div>
                    <el-date-picker
                            v-model="endTime"
                            type="date"
                            :editable="false"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        <template slot="prepend">生日</template>
                    </el-date-picker>
                </div>
                <div class="save" @click="addUser">添加</div>
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
                sex:"",
                number:"",
                tel:"",
                address:"",
                type:"",
                isInSchool:false,
                startTime:"",
                endTime:""
            }
        },
        methods:{
            close(){
                this.$emit("close2",false)
            },
            addUser(){
                var obj={
                    "userInfo":{
                        name:this.name,
                        sex:this.sex,
                        number:this.number,
                        tel:this.tel,
                        address:this.address,
                        type:this.type,
                        startTime:this.startTime,
                        endTime:this.endTime,
                    }
                };
                if(this.isInSchool){
                    obj.userInfo.isInSchool=1;
                }else{
                    obj.userInfo.isInSchool=0;
                }
                console.log(obj)
                axios.post("/addUser",obj)
                    .then(function (res) {
                    if(res.data == "success"){
                        alert("添加成功");
                        window.location.href="/index";
                    }else if(res.data == "failed"){
                        alert("添加失败");
                    }
                })
                    .catch(function (e) {
                        console.log(e);
                    })
            }
        },
        mounted(){

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
        padding: 0.1rem 0;
        margin: 0 auto;
    div{
        width: 80%;
        margin: 0 auto;
        margin-left: 10%;
    }
    .title{
        width: 100%;
        text-align: center;
        height: 0.3rem;
        line-height: 0.3rem;
        margin-left: 0;
    }
    .save{
        margin-top: 0.2rem;
        width: 100px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        background: #64b543;
        display: inline-block;
        border-radius: 10px;
        color: white;
        font-size: 0.12rem;
        margin-left: calc(50% - 50px);
    }
    .switch{
    span{
        display: inline-block;
        height: 40px;
        line-height: 40px;
        padding:0 20px;
        background-color: #f5f7fa;
        border: 1px solid #dcdfe6;
        color: #909399;
        font-size: 14px;
    }
    }
    .el-switch{
        margin-left: 0;
        display: inline;
    }
    .group{
        font-size:0;
    div{
        vertical-align: top;
        font-size: 14px;
    }
    .lable{
        background-color: #f5f7fa;
        color: #909399;
        display: inline-block;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        vertical-align: top;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        text-align: center;
        width: 29%;
        margin-left: 0;
    }
    .el-date-editor{
        margin-left: 0;
        width: 70%;
    }
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
    }
    .center{
        z-index: 2;
        position: fixed;
        top: 0.2rem;
    }
</style>