'use strict'
const utils = require('./utils')  // 工具类
const webpack = require('webpack') // ***************
const config = require('../config')  // 配置文件
const merge = require('webpack-merge') // *********   合并--- 合并基础配置和开发配置文件
const path = require('path') // *********
const baseWebpackConfig = require('./webpack.base.conf') // webpack的基础配置文件
const CopyWebpackPlugin = require('copy-webpack-plugin') // *********
const HtmlWebpackPlugin = require('html-webpack-plugin') // *********    会自动引入css和js文件到index.html
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') // ********* 能够更好在终端看到webapck运行的警告和错误
const portfinder = require('portfinder') // *********

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: { // 使用代码调试---控制台 ---- sources
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool, // 开发者工具

  // these devServer options should be customized in /config/index.js
  devServer: { // 开发服务器的配置
    clientLogLevel: 'warning',
    historyApiFallback: { // 跳转不跳转
      rewrites: [ // 重写
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true, // 热替换  ---  代码更新，服务器自动刷新
    contentBase: false, // since we use CopyWebpackPlugin. // 本地服务器所加载的页面所在的目录
    compress: true, // 是否启用 gzip 压缩
    host: HOST || config.dev.host, // 域名+端口
    port: PORT || config.dev.port, // 端口 默认为8080，如果被占用，则会自动分配一个端口
    open: config.dev.autoOpenBrowser, // 是否自动打开默认浏览器运行，默认是不打开
    // 用来在编译出错的时候，在浏览器页面上显示错误，默认是false
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable, // 代理服务器的设置，可以解决跨域问题
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: { // 热替换监听配置选项
      poll: config.dev.poll,
    }
  },
  plugins: [ // 插件
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env') // 表明为开发环境
    }),
    new webpack.HotModuleReplacementPlugin(), // 热加载插件
    // 作用是在热加载时直接返回更新文件名,而不是文件的id
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // 打包文件
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成 html 文件的文件名。默认为 index.html.
      template: 'index.html', // 根据自己的指定的模板文件来生成特定的 html 文件
      inject: true  // 注入选项。有四个选项值 true, body, head, false.
      /**
       *true  默认值，script标签位于html文件的 body 底部

       body 同 true

       head script 标签位于 head 标签内

       false 不插入生成的 js 文件，只是单纯的生成一个 html 文件
       */
    }),
    // copy custom static assets 复制静态的资源文件
    new CopyWebpackPlugin([ // 将src/static文件夹内部的所有文件全部复制到项目生成的目录
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: { // 项目开发环境下的提示语句
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
