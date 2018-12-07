const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


function resolve(name) {
  return path.resolve(__dirname, '..', name)
}

module.exports = {
  mode: 'production',
  entry: {
    app: './src/main.ts'
  },
  output: {
    path: resolve('dist'),
    filename: 'chunk/[id].[chunkhash:8].js',
    publicPath: './'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }, {
        test: /\.tsx?$/,
        use: ['ts-loader']
      }, {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({filename: 'index.html', template: 'src/index.html'}),
    new MiniCssExtractPlugin({filename: 'style/[name].[contenthash:8].css'})
  ]
}
