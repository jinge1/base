const path = require('path')
const webpack = require('webpack')
const getIp = require('os-ip')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const dll_manifest = require('../dll/vue_libs_manifest.v1.json')
const { VueLoaderPlugin } = require('vue-loader')

function resolve(name) {
  return path.resolve(__dirname, '..', name)
}

module.exports = {
  mode: 'development',
  entry: {
    app: './src/main.js'
  },
  output: {
    path: resolve('dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.vue', '.css']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.js$/,
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
        use: ['vue-style-loader', 'style-loader', 'css-loader', 'postcss-loader']
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new VueLoaderPlugin(),
    new webpack.DllReferencePlugin({
      manifest: dll_manifest
    }),
    new CopyWebpackPlugin([{
      from: resolve('dll'),
      to: resolve('dist/dll'),
      toType: 'dir'
    }])
  ],
  devtool: 'inline-source-map',
  devServer: {
    host: getIp(),
    port: 8888,
    contentBase: './dist'
  }
}
