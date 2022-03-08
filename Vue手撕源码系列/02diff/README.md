# diff算法

功能：提升性能
虚拟dom ==》 其实就是数据（ 把dom数据化 ）
主流框架依赖：snnabdom virtual-dom

## 下载依赖

```shell
cnpm i webpack webpack-cli webpack-dev-server snabbdom -S
```

## 配置webpack
```js
const path = require('path')
module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: "./js/[name].js"
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname,'./public')
    },
    hot: true,
    open: true
  }
}
```