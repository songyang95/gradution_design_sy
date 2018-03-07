import util from "./utils.js"
import Vue from "vue"
import logined_com from "../components/login.vue"
let getEl = function () {
    return (document.querySelector('.app') || document.body).appendChild(document.createElement('div'));
};

let login = {};
login.login = function (flag,callback) {
    var logined = util.utils.getDataFromCookies("isLogin");
    // console.log(logined);
    if(logined){
        callback();
    }else{
        if(flag){
            new Vue({
                el: getEl(),
                components:{
                    logined_com:logined_com
                },
                template:'<logined_com :isHaveMask="true"/>'
            })
        }else{
            new Vue({
                el: getEl(),
                components:{
                    logined_com:logined_com
                },
                template:'<logined_com :isHaveMask="false"/>'
            })
        }

    }
};
export default {
    login
}
