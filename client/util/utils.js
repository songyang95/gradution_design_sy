let utils = {};
utils.getDataFromCookies = function (key) {
    var cookies=document.cookie.replace(" ","");
    var result=null;
    if(cookies != []){
        if(document.cookie.toString().indexOf(key)!=-1){
            if(document.cookie.toString().indexOf(";")!=-1){
                cookies.split(";").map(function (item) {
                    if(item.replace(" ","").split("=")[0].toString() == key){
                        result=item.split("=")[1].toString();
                    }
                });
            }else{
                result=document.cookie.toString().split("=")[1].toString();
            }
        }else{
            result = false;
        }
    }else{
        result = false;
    }
    return result;
};
utils.getQuery = function (name) {
    var reg = new RegExp('(^|&?)' + name + '=([^&]*)(&|$)', 'i')
    var r = window.location.search.match(reg)
    if (r != null) return decodeURIComponent(r[2])
    return null
}
export default {
    utils
}
