const path = require('path')
const getIp = require('os-ip')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: 'development',
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/'
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
    new VueLoaderPlugin()
  ],
  devtool: 'inline-source-map',
  devServer: {
    host: getIp(),
    port: 8888,
    contentBase: './dist'
  }
}
