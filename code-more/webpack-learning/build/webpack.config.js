const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

console.log('process.env.NODE_ENV=', process.env.NODE_ENV) // 打印环境变量

const config = {
  mode: "development",//指定构建模式
  entry: {
    main: path.resolve(__dirname, '../src/index.js'),// 指定构建入口文件
    header: path.resolve(__dirname, '../src/header.js'),// 指定构建入口文件
  },
  output: {
    path: path.resolve(__dirname, '../dist'),// 指定构建生成文件所在路径
    filename: "js/[name].[hash:8].js"// 指定构建生成的文件名
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../public') // 开发服务器启动路径
    },
    hot: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      chunks: ['main'] // 与入口文件对应的模块名
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/header.html'),
      filename: 'header.html',
      chunks: ['header'] // 与入口文件对应的模块名
    }),
    // 每次打包，自动清除dist文件
    new CleanWebpackPlugin()
  ],
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader'] // 从右向左解析原则
      },
      {
        test:/\.less$/,
        use:['style-loader','css-loader','less-loader'] // 从右向左解析原则
      }
    ]
  }
  // module: {
  //   rules: [
  //     {
  //       test: /\.css$/,
  //       use: ['style-loader', 'css-loader'] // 从右往左解析原则
  //     },
  //     {
  //       test: /\.less$/,
  //       use: ['style-loader', 'css-loader', 'less-loader'] // 从右往左解析原则
  //     }
  //   ]
  // }
}

module.exports = (env, argv) => {
  console.log('argv.mode=',argv.mode) // 打印 mode(模式) 值
  // 这里可以通过不同的模式修改 config 配置
  return config;
}

