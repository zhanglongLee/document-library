const path = require('path')
const ejs = require('ejs')
const fs = require("fs")

/**
 * format
 * https => https://github.com/NuoHui/node_code_constructor.git
 * ssh => git@github.com:NuoHui/node_code_constructor.git
 * want => github:NuoHui/node_code_constructor
 */
const getRealGitRepo = function (gitRepo) {
  let gitRepoArr = gitRepo.split("#")
  gitRepo = gitRepoArr.length > 1 ? gitRepoArr[0] : gitRepo
  let branch = gitRepoArr.length > 1 ? '#' + gitRepoArr[1] : ""
  const sshRegExp = /^git@github.com:(.+)\/(.+).git$/;
  const httpsRegExp = /^https:\/\/github.com\/(.+)\/(.+).git$/;
  const giteeHttpsRegExp = /^https:\/\/gitee.com\/(.+)\/(.+).git$/;
  if (sshRegExp.test(gitRepo)) {
    // ssh
    const match = gitRepo.match(sshRegExp);
    return `github:${match[1]}/${match[2]}`;
  }
  if (httpsRegExp.test(gitRepo)) {
    // https
    const match = gitRepo.match(httpsRegExp);
    return `github:${match[1]}/${match[2]}${branch}`;
  }
}
/**
 * 编译ejs的方法
 */
const compile = (templateName, data) => {
  // 模板的相对路径
  const templatePosition = `../templates/${templateName}`
  // 拼接当前路径后的模板路径
  const templatePath = path.resolve(__dirname, templatePosition)
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) {
        reject(err)
        console.log('读文件报错了~', err);
        return
      }
      resolve(result)
    })
  })
}

// 递归判断路径是否存在，并创建对应的文件夹
// /src/pages/index/hello
const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true
  } else {
    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName)
      return true
    }
  }
}

const writeToFile = (targetPath, content) => {
  // 判断targetPath是否存在，如果不存在，先创建对应的文件夹
  return fs.promises.writeFile(targetPath, content)
}
module.exports = {
  compile,
  writeToFile,
  createDirSync,
  getRealGitRepo
}
