const path = require('path')
const webpack = require('webpack')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const {VueLoaderPlugin} = require('vue-loader')

function resolve(name) {
  return path.resolve(__dirname, '..', name)
}

module.exports = {
  mode: 'production',
  entry: {
    vue_libs: ['vue', 'vue-router', 'vuex'],
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
        use: ['vue-style-loader', 'style-loader', 'css-loader', 'postcss-loader']
      }, {
        test: /\.(png|svg|jpg|gif)$/,
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
    // new HtmlWebpackPlugin({filename: 'index.html', template: 'src/index.html'}),
    // new VueLoaderPlugin(),
    new webpack.DllPlugin({
      path: resolve('dll/[name]_manifest.v1.json'),
      // path.join(__dirname, 'dist', '[name]-manifest.json'),
      name: '[name]_[chunkhash:8]'
    })
  ]
}


// new webpack.DllReferencePlugin({
//   manifest: dll_manifest
// }),
