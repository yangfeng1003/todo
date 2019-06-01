const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const isDev = process.env.NODE_ENV === 'development'; /*package.json里面的dev判断*/

const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

//css分离打包 mini-css-extract-plugin  extract-text-webpack-plugin@next
const ExtractPlugin = require('extract-text-webpack-plugin');

const config  = {
//module.exports = {
    target: 'web',
    entry: path.join(__dirname,'./src/index.js'),
    output: {
        // filename: "bundle.js",
        filename: "bundle.[hash:8].js", /*正式环境与开发环境进行区分*/
        path: path.join(__dirname,'dist'),
    },
    module: {
        rules: [
            {
                test:/\.vue$/,   /*使用vue-loader处理.vue文件*/
                loader: 'vue-loader'
            },/*{
                test: /\.css$/,
                use:['style-loader','css-loader'],
            },*/
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                use: [{
                        loader:'url-loader',
                        options: {
                            limit:1024,
                            name:'[name]-picf.[ext]'
                        }
                    }]
            },{
                test: /\.jsx$/,
                loader: 'babel-loader'
            }
        ]
    },
    /*错误提示：asset(s) 最大限制在244K。解决：修改webpack 的性能提示配置 */
    performance: {
        hints:'warning',   /*或者直接关闭hints:false*/
        //入口起点的最大体积
        maxEntrypointSize: 50000000,
        //生成文件的最大体积
        maxAssetSize: 30000000,
        //只给出 js 文件的性能提示
        assetFilter: function(assetFilename) {
            return assetFilename.endsWith('.js');
        }
    },
    plugins:[
        new VueLoaderPlugin(), /*Vue-loader在15.*之后的版本的使用都是需要带有VueLoaderPlugin的，还需另外单独配置css-loader*/
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV : isDev?'"development"':'"production"'
            }
        }),
        /*如果'"development"'不加引号，那么最后解析会变成process.env.NODE_ENV=development，没有development这个变量 缺少引号*/
        new HTMLPlugin(),
    ],
};

if(isDev){
    config.devtool = '#cheap-module-eval-source-map';/*在浏览器上页面可以调试，不加的话是vue，es6等的编译代码*/
    config.devServer = {
        port:8001,
        host:'localhost',/*既可以通过localhost:8000访问到，又可以通过127.0.0.1:8000,别人也可以通过自己的ip访问到*/
        overlay:{
            errors:true /*有任何错误都显示到网页*/
        },
        hot:true /*原来修改东西 页面自动刷新  现在不刷新，只更新内容*/
        /*historyFallback:{ //单页应用的映射 }*/
       // open:true,/*修改文件后默认打开浏览器*/
    };
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    );
    config.module.rules.push({
        test: /\.styl/,  /*注意这里没有$结束符，这样既可以匹配styl文件，又可以匹配stylus*/
        use: [
            'style-loader',
            'css-loader',
            {
                loader: "postcss-loader",
                options: {
                    sourceMap:true,
                }
            },
            'stylus-loader'
        ]
    })
}else{
    config.entry = {
        app: path.join(__dirname,'./src/index.js'),
        vendor:['vue']  /*将框架与业务代码单独打包，是浏览器尽可能久地缓存框架代码而不随着业务修改而刷新*/
    };
    config.output.filename = '[name].[chunkhash:8].js'; /*采用双hash,上面的hash和这里的trunkhash进行区分，即app.js与vendor.js进行区分，他们是两个不同的hash值*/
    config.module.rules.push({
        test: /\.styl/,
        use: ExtractPlugin.extract({
            fallback:'style-loader',
            use:[
                'css-loader',
                {
                    loader: "postcss-loader",
                    options: {
                        sourceMap:true,
                    }
                },
                'stylus-loader'
            ]
        })
    });
    config.plugins.push(
            new ExtractPlugin('styles.[chunkHash:8].css'),
    );
    config.optimization = {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2, maxInitialRequests: 5,
                    minSize: 0
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10,
                    enforce: true
                }
            }
        },
        runtimeChunk: true /*有新的模块加入时，webpack会给新的模块加一个id，保证模块顺序不变*/ /*打包后发现多了一个runtime~app.js*/
    }
}

module.exports = config;