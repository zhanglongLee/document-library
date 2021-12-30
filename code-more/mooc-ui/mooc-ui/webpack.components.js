const glob = require("glob");
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
let list = {}

async function makeList(filePath, list) {
  let files = glob.sync(`${filePath}/**/index.js`);
  console.log(files);
  for (let file of files) {
    let component = file.split(/[/.]/)[2];
    list[component] = `./${file}`;
  }
  console.log(list)
}
makeList('components/lib', list);

module.exports = {
  entry: list,
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].umd.js",
    library: "mui",
    libraryTarget: "umd"
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /.vue$/,
        use: [
          {
            loader: "vue-loader"
          }
        ]
      }
    ]
  }

}
