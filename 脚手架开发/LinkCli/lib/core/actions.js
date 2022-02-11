// 将回调函数转换成promise形式
const path = require('path')
const { promisify } = require('util')
const download = promisify(require('download-git-repo'))
const { vueRepo } = require('../config/repo-config')
const { commandSpawn } = require('../utils/terminal')
const { compile, writeToFile, createDirSync } = require('../utils/utils')

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
    const targetPath = path.resolve(process.cwd(), `./${dest}/${name}.vue`)
    console.log(targetPath);

    // 4.放到对应的文件夹中
    writeToFile(targetPath, result)
  } catch (error) {
    console.log(error);
  }
}

// 创建页面action
const createPageAction = async (name, dest) => {
  try {
    let data = { name, lowerName: String.prototype.toLowerCase.call(name) }
    // 1.编译ejs文件，生成result
    const pageResult = await compile('vue-component.ejs', data)
    const routerResult = await compile('vue-router.ejs', data)
    // 2.将result写入.vue文件
    // process.cwd()为当前cmd执行命令的路径
    const targetPagePath = path.resolve(process.cwd(), `./${dest}/${name}.vue`)
    const targetRouterPath = path.resolve(process.cwd(), `./${dest}/router.js`)
    console.log(targetPagePath);
    console.log(targetRouterPath);

    // 4.放到对应的文件夹中
    if (createDirSync(dest)) {
      writeToFile(targetPagePath, pageResult)
      writeToFile(targetRouterPath, routerResult)
    }
  } catch (error) {
    console.log('错误啦~', error);
  }
}

const createStoreAction = async (name, dest) => {
  try {
    let data = { name, lowerName: String.prototype.toLowerCase.call(name) }
    // 1.编译ejs文件，生成result
    const storeResult = await compile('vue-store.ejs', data)
    const typesResult = await compile('vue-types.ejs', data)
    // 2.将result写入.vue文件
    // process.cwd()为当前cmd执行命令的路径
    const targetStorePath = path.resolve(process.cwd(), `./${dest}/index.js`)
    const targetTypesPath = path.resolve(process.cwd(), `./${dest}/types.js`)
    console.log(targetStorePath);
    console.log(targetTypesPath);

    // 4.放到对应的文件夹中
    if (createDirSync(dest)) {
      writeToFile(targetStorePath, storeResult)
      writeToFile(targetTypesPath, typesResult)
    }
  } catch (error) {
    console.log('错误啦~', error);
  }
}
module.exports = {
  createProjectAction,
  createComponentAction,
  createPageAction,
  createStoreAction
}
