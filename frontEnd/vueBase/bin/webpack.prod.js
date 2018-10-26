const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
    filename: 'bundle.js',
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
  ]
}
