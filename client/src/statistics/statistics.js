import Vue from "vue";
import statistics from "./vue/statistics.vue";
import com_title from "../../components/com-title.vue";
import "../../public/js/rem.js"
import "../../public/stylesheets/bootStrap.css"
import "../../public/stylesheets/style.css"
import ElementUI from 'element-ui'
Vue.use(ElementUI);

new Vue({
    el:"#app",
    components:{
        statistics:statistics,
        com_title:com_title
    }
})