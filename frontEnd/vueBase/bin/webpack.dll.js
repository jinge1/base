const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {VueLoaderPlugin} = require('vue-loader')

function resolve(name) {
  return path.resolve(__dirname, '..', name)
}

module.exports = {
  mode: 'production',
  entry: {
    vue_libs: ['vue', 'vue-router', 'vuex', './src/test.js', './src/components/Loading.vue', './src/public/reset.css'],
    // 'element_libs': ['element-ui']
  },
  output: {
    filename: '[name].v1.js',
    // chunkFilename: 'chunk/[id].[chunkhash:8].js',
    path: resolve('dll'),
    library: '[name]_[chunkhash:8]'
    // publicPath: './'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.css', '.js', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.js$/,
        include: resolve('src'),
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
        // use: ['vue-style-loader', 'style-loader', 'css-loader', 'postcss-loader']
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      }, {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // 8kb以内采用base64处理
              limit: 8000,
              name: 'assets/[name].[hash:8].[ext]'
            }
          }
        ]
      }, {
        // 字体文件处理
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8000,
              name: 'fonts/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([resolve('dll')], {root: resolve('/')}),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({filename: 'style/[name].[contenthash:8].css'}),
    new webpack.DllPlugin({
      path: resolve('dll/[name]_manifest.v1.json'),
      // path.join(__dirname, 'dist', '[name]-manifest.json'),
      name: '[name]_[chunkhash:8]'
    })
  ]
}
