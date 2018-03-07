<template>
    <div>
        <div class="mask_box" v-if="isHaveMask"></div>
        <div class="box">
            <div class="box_title">login</div>
            <div class="box_label">username</div>
            <div class="box_input"><input type="text" v-model="username"></div>
            <div class="box_label">password</div>
            <div class="box_input"><input type="text" v-model="password"></div>
            <div class="box_btn">
                <div class="btn_left" @click="login">登录</div>
                <div class="btn_right">注册</div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios"
    export default {
        props:{
            isHaveMask:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
                username:'',
                password:""
            }
        },
        methods:{
            login(){
                var _this=this;
                var obj={
                    "username":_this.username,
                    "password":_this.password
                }
                axios.post("/login",obj).then(function (res) {
                   if(res.data == "success"){
                       alert("登录成功");
                       window.location.reload();
                   }else if(res.data == "failed"){
                       alert("登录失败");
                   }
                });
            }
        }
    }
</script>
<style scoped lang="scss">
    .mask_box{
        height: 100%;
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background: gray;
    }
    .box{
        width: 2rem;
        height: 2rem;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1.3rem;
        border-radius: 10px;
        background: #c5c5c5;
        border: 1px solid tan;
        .box_title{
            text-align: center;
            width: 100%;
            height: 0.3rem;
            line-height: 0.3rem;
            font-size: 0.16rem;
        }
        input{
            width: 1.6rem;
            height: 0.3rem;
            border-radius: 4px;
            border: 0;
            text-indent: 10px;
        }
        .box_input{
            margin-left: 0.2rem;
            width: 1.6rem;
            height: 0.3rem;

        }
        .box_label{
            margin-top: 0.1rem;
            margin-left: 0.2rem;
            margin-bottom: 0.05rem;
        }
        .box_btn{
            margin-top: 0.1rem;
            font-size: 0;
            height: 0.3rem;
            div{
                height: 100%;
                vertical-align: top;
                display:inline-block;
                font-size: 0.14rem;
                width: 35%;
                margin-left: 10%;
                border-radius: 10px;
                background: #e6e6e6;
                line-height: 0.3rem;
                text-align: center;
            }
        }
    }
</style>