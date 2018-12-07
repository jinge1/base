const path = require('path')
const getIp = require('os-ip')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')
const vues_manifest = require('../dll/vues_manifest.v1.json')
const utils_manifest = require('../dll/utils_manifest.v1.json')
const components_manifest = require('../dll/components_manifest.v1.json')

function resolve(name) {
  return path.resolve(__dirname, '..', name)
}

module.exports = {
  mode: 'development',
  entry: {
    app: './src/main'
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
    new HtmlWebpackPlugin({filename: 'index.html', template: 'src/index.html'}),
    new VueLoaderPlugin(),
    new webpack.DllReferencePlugin({manifest: vues_manifest}),
    new webpack.DllReferencePlugin({manifest: utils_manifest}),
    new webpack.DllReferencePlugin({manifest: components_manifest}),
    new CopyWebpackPlugin([
      {
        from: resolve('dll'),
        to: resolve('dist/dll'),
        toType: 'dir'
      }
    ])
  ],
  devtool: 'inline-source-map',
  devServer: {
    host: getIp(),
    port: 8800,
    contentBase: './dist'
  }
}
