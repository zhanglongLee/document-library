const path = require('path')
const ejs = require('ejs')
const fs = require("fs")
/**
 * 编译ejs的方法
 */
const compile = (templateName, data) => {
  console.log(data);
  // 模板的相对路径
  const templatePosition = `../templates/${templateName}`
  // 拼接当前路径后的模板路径
  const templatePath = path.resolve(__dirname,templatePosition)
  return new Promise((resolve,reject)=>{
    ejs.renderFile(templatePath,{data},{},(err,result)=>{
      if(err){
        reject(err)
        console.log(err);
        return
      }
      resolve(result)
    })
  })
}
const writeToFile = (targetPath,content)=>{
  return fs.promises.writeFile(targetPath,content)
}
module.exports = {
  compile,
  writeToFile
}
