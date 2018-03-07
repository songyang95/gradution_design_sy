<template>
    <div>
        <div class="head wapper">
            <div @click="go_href('/index')" :class="{selected:select=='index'}">学生管理</div>
            <div @click="go_href('/bedroom')" :class="{selected:select=='bedroom'}">寝室管理</div>
            <div @click="go_href('/expense')" :class="{selected:select=='expense'}">费用管理</div>
            <div @click="go_href('/statistics')" :class="{selected:select=='statistics'}">统计分析</div>
        </div>
        
    </div>
</template>
<script>
    import util from "../util/utils.js"
    import axios from "axios"
    export default {
        props:{
            select:{
                type:String,
                default:"index"
            }
        },
        data(){
            return {
                flag:true
            }
        },
        methods:{
            go_href(url){
              window.location.href=  url;
            }
        },
        mounted(){
//            console.log(util.utils.getDataFromCookies("mahenan"));
        }
    }
</script>
<style scoped lang="scss">
    .wapper{
        max-width: 640px;
        margin: 0 auto;
        font-size: 14px;
    }
    .head{
        margin: 0 auto;
        max-width: 640px;
        height: 0.2rem;
        background: #6f5499;
        font-size:0;
        div{
            font-size: 14px;
            vertical-align: top;
            width: 25%;
            height: 100%;
            text-align: center;
            line-height: 0.2rem;
            color:white;
            display: inline-block;
        }
    }
    .head .selected{
        color:#423535;
    }
</style>