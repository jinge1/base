const path =require('path')
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
// const nodeExternals = require('webpack-node-externals')
// const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const { VueLoaderPlugin } = require('vue-loader')
// const isProd = process.env.NODE_ENV === 'production'
// console.log('NODE_ENV--->', process.env.NODE_ENV)
module.exports = {
  //页面入口文件配置
  entry: {
    index: './src/entry-server.js'
  },
  target: 'node',
  mode: 'production',
  //入口文件输出配置
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }, {
        test: /\.css$/,
        use: ['css-loader']
      }, {
        test: /\.es6$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.js', '.vue', '.css'
    ]
    // alias: {
    //   'vue$': 'vue/dist/vue.js'  'vue/dist/vue.common.js' for webpack 1
    // }
  },
  plugins: [
    new VueLoaderPlugin(),
    // new VueSSRServerPlugin()
  ]
}
