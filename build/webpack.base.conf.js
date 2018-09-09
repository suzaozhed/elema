'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf') // vue单文件组件解析器的配置

function resolve (dir) { // 拼接路径
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({ // 创建代码验证的规则
  test: /\.(js|vue)$/, // 验证的是js文件和vue文件
  loader: 'eslint-loader', // 用eslint-loader解析器去解析
  enforce: 'pre', // 提前
  include: [resolve('src'), resolve('test')], // 要验证哪里，如果是exclude表示不去验证哪里---验证src文件和test文件----代码文件和测试文件
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'), // 内容区域为myapp文件下
  entry: { // 整个程序的入口文件地址为src文件夹下的main.js
    app: './src/main.js' //  --- 可以输出为app.js
   },
  output: { //  -- 输出目录
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: { // 寻找模块对应的文件
    extensions: ['.js', '.vue', '.json'], // 如果你的文件名后缀是这三个，则可以省略
    alias: { // 取别名
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src') // 将src文件夹设置为@
    }
  },
  module: { // 解析器
    rules: [ // 规则
      ...(config.dev.useEslint ? [createLintingRule()] : []), // 代码验证规则，可以注释掉
      {
        test: /\.vue$/, // 以.vue结尾的文件
        loader: 'vue-loader', // 解析器
        options: vueLoaderConfig // 配置文件
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, // css中添加的背景图片
        loader: 'url-loader',
        options: {
          limit: 10000, // 图片不能大于10000KB
          name: utils.assetsPath('img/[name].[hash:7].[ext]') // 编译后生成的名字
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    //以下选项是Node.js全局变量或模块，这里主要是防止webpack注入一些Node.js的东西到vue中
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
