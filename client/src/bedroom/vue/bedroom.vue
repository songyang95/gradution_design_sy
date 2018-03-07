<template>
    <div class="wapper">
        <div class="search">
            <el-select style="max-width: 120px;" v-model="value" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <input type="text" v-model="searchKey" placeholder="按照选择条件检索">
            <span @click="search" class="glyphicon glyphicon-search" aria-hidden="true"></span>
            <span @click="add" class="glyphicon glyphicon-plus" aria-hidden="true"></span>
        </div>
        <detail :count="nowDetail" v-if="flag" @close="close"></detail>
        <add v-if="addSwitch" @close2="close2"></add>
        <div class="list">
            <div class="list_no">编号</div>
            <div class="list_name">区号</div>
            <div class="list_name">楼号</div>
            <div class="list_name">门牌号</div>
            <div class="list_name">床号</div>
            <div class="list_edit">编辑</div>
            <div class="list_del">删除</div>
        </div>
        <div class="list" v-for="(item,index) in dataList">
            <div class="list_no">{{index+1}}</div>
            <div class="list_name">{{item.area}}</div>
            <div class="list_name">{{item.house}}</div>
            <div class="list_name">{{item.door}}</div>
            <div class="list_name">{{item.bed}}</div>
            <div class="list_edit" @click="edit(item.id)"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></div>
            <div class="list_del" @click="deleted(item.id)"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></div>
        </div>
    </div>
</template>
<script>
    import detail from "./userDetail.vue"
    import add from "./addDetail.vue"
    import axios from "axios"
    import util from "../../../util/utils.js"
    export default {
        components:{
            detail:detail,
            add:add
        },
        mounted(){
            this.dataList=this.data;
        },
        data(){
            return {
                flag:false,
                nowDetail:0,
                dataList:[],
                addSwitch:false,
                searchKey:util.utils.getQuery("searchKey") || "",
                options: [{
                    value: '0',
                    label: '所有'
                },{
                    value: '1',
                    label: '区号'
                }, {
                    value: '2',
                    label: '楼号'
                }, {
                    value: '3',
                    label: '门牌号'
                }, {
                    value: '4',
                    label: '床号'
                }],
                value: ''
            }
        },
        props:["data"],
        methods:{
            search(){
                if(this.value == ""){
                    alert("请选择搜索类别");
                }else{
                    window.location.href="/search_bedroom?searchKey="+ this.searchKey +"&type=" + this.value;
                }
            },
            deleted(id){
                var _this=this;
                axios.get("/deleted_bedroom?id="+id)
                    .then(function (res) {
                        if(res.data == "success"){
                            alert("删除成功");
//                            console.log("_this.data",_this.data);
                            _this.dataList.map(function (item,index) {
                                if(item.id == id){
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
            add(){
                this.addSwitch=true;
            },
            edit(number){
                this.flag=true;
                this.nowDetail=number;
            },
            close(value){
                this.flag=value;
            },
            close2(value){
                this.addSwitch=value;
            }
        }
    }
</script>
<style scoped lang="scss">
    .wapper{
        max-width: 640px;
        margin: 0 auto;
        font-size: 14px;
    }
    .add{
        /*width: 100%;*/
        width: 1rem;
        margin: 0 auto;
        background: burlywood;
        height: 50px;
        margin-top: 0.1rem;
        text-align: center;
        line-height: 50px;
        margin-bottom: 0.1rem;
        border-radius: 10px;
    }
    .search{
        text-align: center;
        margin-top: 0.1rem;
        margin-bottom: 0.1rem;
    input{
        border-radius: 10px;
        text-indent: 10px;
        padding: 5px;
        border: 1px solid #6a6a6d;
        width: 40%;
        height: 20px;
    }
    span{
        display: inline-block;
        height: 30px;
        width: 30px;
        vertical-align: top;
        line-height: 30px;
    }
    }
    .list{
        height: 50px;
        border-bottom: 1px solid #e6e6e6;
        line-height: 50px;
        font-size: 0;
    div{
        display: inline-block;
        vertical-align: top;
        font-size: 14px;
        text-align: center;
        line-height: 50px;
        height: 50px;
        width: 16%;
    }
    .list_edit,.list_del{
        width: 10%;
    }
    }
</style>