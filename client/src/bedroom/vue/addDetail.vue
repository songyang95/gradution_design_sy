<template>
    <div>
        <div class="mask" @click="close"></div>
        <div class="center wapper">
            <div class="padding">
                <div class="title">添加寝室信息</div>
                <el-input placeholder="请输入名字" v-model="area">
                    <template slot="prepend">区号</template>
                </el-input>
                <el-input placeholder="请输入名字" v-model="house">
                    <template slot="prepend">楼号</template>
                </el-input>
                <el-input placeholder="请输入名字" v-model="door">
                    <template slot="prepend">门牌号</template>
                </el-input>
                <el-input placeholder="请输入名字" v-model="bed">
                    <template slot="prepend">床号</template>
                </el-input>
                <div class="save" @click="addBed">添加</div>
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
                area:"",
                house:"",
                door:"",
                bed:""
            }
        },
        methods:{
            close(){
                this.$emit("close2",false)
            },
            addBed(){
                var obj={
                    "bedInfo":{
                        area:this.area,
                        house:this.house,
                        door:this.door,
                        bed:this.bed
                    }
                };
                axios.post("/addBed",obj)
                    .then(function (res) {
                    if(res.data == "success"){
                        alert("添加成功");
                        window.location.href="/bedroom";
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