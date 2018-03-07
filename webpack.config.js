/**
 * Created by mahenan on 2017/10/20.
 */
// nodejs 中的path模块

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var glob = require("glob")
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var entry={};
var pluginsArr=[];
var arr=[new ExtractTextPlugin("css/[name].css")];
var pathList=glob.sync('client/src' + '/*/*.js');
pathList.map(function (item) {
    var exec=/([^<>/\\\|:""\*\?]+)\.\w+$/.exec(item);
    var name=exec[1];
    pluginsArr.push(name);
    entry[name]=path.resolve(__dirname, item);
});
pluginsArr.map(function (item) {
    console.log(item);
    arr.push(new HtmlWebpackPlugin({
        filename: item+'.html',
        chunks:[item],
        //表示都包含哪些chunk，可以使用excludechunks表示除了哪些
        //chunks表示的是，可以理解为入口文件的集合
        template:path.resolve(__dirname, 'client/src/'+item+'/'+item+'.ejs'),

    }));

});
if(process.env.dev=="dev"){
    console.log("dev");
}else if(process.env.dev=="prod"){
    console.log("prod");
}

module.exports = {
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    entry: entry,
    // entry: ["./src/a/a.js","./src/b/b.js"],
    // 输出配置
    output: {
        // 输出路径是 mahenan/output
        path: path.resolve(__dirname, 'views/'),
        // path: 'output/static/[name]/',

        // publicPath: 'mahenan',
        publicPath: '',
        //上线时的使用  ex:可写http://cdn.com/取到的资源文件路径就是相对于这个地址的

        filename: 'js/[name].js',
        // filename: 'js/mahenan.js',
        // chunkFilename: '[id].js'
    },
    resolve: {
        extensions: ['.css','.js', '.vue','.scss'],
        alias: {
            'vue': 'vue/dist/vue.esm.js'
        }
    },
    module: {
        rules: [
            // 使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.es6$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                // loader:ExtractTextPlugin.extract("style-loader", 'css-loader!sass-loader'),
                loader:'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.css$/,
                // 单独抽离出css
                use: ExtractTextPlugin.extract({
                    use: 'css-loader'
                })
                // 使用style-loader和css-loader将其加载到js中
                // use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.jpg|\.png|\.jpeg/,
                use: 'url-loader'
            },
            //important
            {
                test: /\.ejs/,
                loader: "ejs-loader",
                query: {
                    variable: 'all',
                    interpolate : '\\{\\{(.+?)\\}\\}',
                    evaluate : '\\[\\[(.+?)\\]\\]'
                }
            }
        ]
    },
    devServer:{
        host:"192.168.2.255"
    },
    plugins: arr
};