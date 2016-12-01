var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  plugins: [
    // 热刷新模块
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.DefinePlugin({
    //  'process.env': {
    //    NODE_ENV: '"production"'
    //  }
    // }),
    // 允许错误不打断程序
    // new webpack.NoErrorsPlugin(),
    // 提取公共模块
    // new webpack.optimize.CommonsChunkPlugin('common.js'),
    // css独立打包
    // new ExtractTextPlugin("css/[name].css", {allChunks: true}),
    // 压缩
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.optimize.OccurenceOrderPlugin()//按引用频度来排序 ID，以便达到减少文件大小的效果。
  ],
  entry: {
    'js/build': ['./item/js/public.js']

  },
  output: {
    path: './dist',
    publicpath:'dist',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      // {
      //   test: /\.css$/,
      //   loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      // },
      // {
      //   test: /\.scss$/,
      //   loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      // },
      {
        //include: [path.resolve(__dirname, "src/app")],//把要处理的目录包括进来,__dirname表示当前目录
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules///排除不处理的目录
      }
      // ,
      // {
      //   // edit this for additional asset file types
      //   test: /\.(png|jpg|gif)$/,
      //   loader: 'url',
      //   query: {
      //     limit: 10000,
      //     name:'../images/[name].[ext]'
      //   }
      // },
      // {
      //   // edit this for additional asset file types
      //   test: /\.(woff|woff2|eot|ttf|svg)$/,
      //   loader: 'url',
      //   query: {
      //     limit: 10000,
      //     name: '[name].[ext]'
      //   }
      // }
    ]
  },
  externals: {//定义全局变量
    // require("jquery") is external and available
    //  on the global var jQuery
    //  "jquery": "jQuery"
    'data': 'data1'
  },
  // example: if you wish to apply custom babel options
  // instead of using vue-loader's default:
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  },
  // lint JavaScript code in *.vue files with ESLint
  vue: {
    loaders: {
      js: 'babel!eslint'
    }
  }
}

//if (process.env.NODE_ENV === 'production') {
//  module.exports.plugins = (module.exports.plugins || []).concat([
//    new webpack.DefinePlugin({
//      'process.env': {
//        NODE_ENV: '"production"'
//      }
//    }),
//    new ExtractTextPlugin("[name].css", {allChunks: true}),
//    new webpack.optimize.UglifyJsPlugin({
//      compress: {
//        warnings: false
//      }
//    }),
//    new webpack.optimize.OccurenceOrderPlugin()
//  ])
//} else {
//  module.exports.devtool = '#source-map'
//}
