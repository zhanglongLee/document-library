// 将回调函数转换成promise形式
const path = require('path')
const { promisify } = require('util')
const download = promisify(require('download-git-repo'))
const { vueRepo } = require('../config/repo-config')
const { commandSpawn } = require('../utils/terminal')
const { compile,writeToFile } = require('../utils/utils')

// callback -> promisify(函数) -> Promise -> async await
// 创建项目action
const createProjectAction = async (project) => {
  try {
    console.log('LinkCli helps you create project...');
    // 1.clone项目
    await download(vueRepo, project, { clone: true })
    console.log('LinkCli helps you install dependency files...');
    // 2.执行npm install
    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
    await commandSpawn(command, ['install'], { cwd: `./${project}` })
    // 3.运行npm run serve
    console.log('LinkCli helps you run the project...');
    await commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` })
    // 4.打开浏览器
    // console.log('LinkCli helps you open a browser...');
  } catch (error) {
    console.log(error);
  }
}

// 创建组件action
const createComponentAction = async (name, dest) => {
  try {
    // 1.编译ejs文件，生成result
    const result = await compile('vue-component.ejs', { name, lowerName: String.prototype.toLowerCase.call(name) })
    // 2.将result写入.vue文件
    // process.cwd()为当前cmd执行命令的路径
    const targetPath = path.resolve(process.cwd(),`./${dest}/${name}.vue`)
    console.log(targetPath);

    // 4.放到对应的文件夹中
    writeToFile(targetPath,result)
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  createProjectAction,
  createComponentAction
}
