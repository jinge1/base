const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const dll_manifest = require('../dll/vue_libs_manifest.v1.json')
const { VueLoaderPlugin } = require('vue-loader')

function resolve(name) {
  return path.resolve(__dirname, '..', name)
}

module.exports = {
  mode: 'production',
  entry: {
    app: './src/main.js'
  },
  output: {
    path: resolve('dist'),
    filename: 'chunk/[id].[chunkhash:8].js',
    publicPath: './'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.vue']
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
        // use: ['style-loader', 'css-loader', 'postcss-loader']
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([resolve('dist')], {root: resolve('/')}),
    new HtmlWebpackPlugin({filename: 'index.html', template: 'src/index.html'}),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({filename: 'style/[name].[contenthash:8].css'}),
    new webpack.DllReferencePlugin({
      manifest: dll_manifest
    }),
    new CopyWebpackPlugin([{
      from: resolve('dll'),
      to: resolve('dist/dll'),
      toType: 'dir'
    }])
  ]
}
