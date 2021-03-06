const path = require('path')
const getIp = require('os-ip')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

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
    extensions: ['.js']
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader']
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      use: ['file-loader']
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    host: getIp(),
    port: 8800,
    contentBase: './dist'
  }
}