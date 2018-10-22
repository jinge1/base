
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  resolve: {
    // 免写后缀名配置
    extensions: [
      '.js', '.vue', '.css'
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/, // babel采用babelrc文件规则
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }, {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        // css配置，暂不使用less及sass文件，采用precss语法
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }, {
        // 图片文件处理
        test: /\.(png|jpg|jpeg|gif|svg|svgz)(\?.+)?$/,
        // exclude: /(static)|(project_static)\/.?/,
        use: [
          {
            loader: 'url-loader',
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
            loader: 'url-loader',
            options: {
              limit: 8000,
              name: 'fonts/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [// html模板配置
    new HtmlWebpackPlugin({template: './src/index.template.html'})],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    // 获取本地ip地址
    // host: '172.21.0.197',
    port: '8888',
    publicPath: '/',
    inline: true,
    noInfo: true,
    historyApiFallback: true
  }
}
