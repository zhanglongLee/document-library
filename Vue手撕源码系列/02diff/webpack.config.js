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
