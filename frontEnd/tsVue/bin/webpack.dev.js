const path = require('path')
const getIp = require('os-ip')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const {
  VueLoaderPlugin
} = require('vue-loader')

function resolve(name) {
  return path.resolve(__dirname, '..', name)
}

module.exports = {
  mode: 'development',
  entry: {
    app: './src/main.ts'
  },
  output: {
    path: resolve('dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: 'vue-loader'
    }, {
      test: /\.tsx?$/,
      use: [{
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      }],
      exclude: /node_modules/
    }, {
      test: /\.js$/,
      use: ['babel-loader']
    }, {
      test: /\.(css|postcss)$/,
      use: [
        'style-loader', 
        'css-loader', 
        'postcss-loader'
      ]
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
    }),
    new VueLoaderPlugin()
  ],
  devtool: 'inline-source-map',
  devServer: {
    host: getIp(),
    port: 8800,
    contentBase: './dist'
  }
}