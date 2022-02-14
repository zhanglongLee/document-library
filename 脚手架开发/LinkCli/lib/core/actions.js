// 将回调函数转换成promise形式
const path = require('path')
const { promisify } = require('util')
const download = promisify(require('download-git-repo'))
const { commandSpawn } = require('../utils/terminal')
const { compile, writeToFile, createDirSync } = require('../utils/utils')
const { logWithSpinner, stopSpinner, failedSpinner } = require('../utils/spinner')
const chalk = require('chalk')
const inquirer = require('inquirer')
const {
  addProjectTemplate,
  listAllTemplate,
  deleteTemplate,
  chooseTemplate
} = require('./template-manager')

// callback -> promisify(函数) -> Promise -> async await
// 创建项目action
const createProjectAction = async (project) => {
  // 1.clone项目
  try {
    // 选择下载的模板,并获取对应下载地址
    let address = await chooseTemplate()
    console.log(`✨ Creating project in ${chalk.yellow(project)}.`);
    stopSpinner();
    logWithSpinner(
      `Download project template. This might take a while...`
    );
    await download(address, project, { clone: false })
    stopSpinner();
    // 2.是否需要安装依赖。Y 执行npm install
    const promptList = [{
      type: "confirm",
      message: "是否安装依赖？",
      name: "needRunInstall",
    }]
    const { needRunInstall } = await inquirer.prompt(promptList)
    if (needRunInstall) {
      stopSpinner();
      logWithSpinner(
        `Installing dependency files....`
      );
      // 需要安装依赖
      const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
      try {
        await commandSpawn(command, ['install'], { cwd: `./${project}` })
        stopSpinner();
      } catch (error) {
        console.log(`${chalk.yellow(project)} npm install failed.`)
        console.log(error);
      }

      try {
        // 3.运行npm run serve
        console.log('Running the project...');
        await commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` })
      } catch (error) {
        failedSpinner(`${chalk.yellow(project)} npm run serve failed.`)
        console.log(error);
      }

    } else {
      // 用户不选择安装依赖，指导用户进入项目，运行npm install命令
      console.log(`cd ./${chalk.yellow(project)}`);
      console.log(`npm install`);
    }
  } catch (error) {
    failedSpinner(`created project ${chalk.yellow(project)} failed.`)
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

// 新增store的action
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

// 显示模板列表的action
const listTemplateAction = () => {
  listAllTemplate()
    .catch(err => {
      console.log(err);
      process.exit(1)
    })

}
// 新增模板的action
const addTemplateAction = (templateName, gitRepoAddress) => {
  addProjectTemplate(templateName, gitRepoAddress)
    .catch(err => {
      console.log(err);
      process.exit(1)
    })
}
// 删除指定名字模板的action
const deleteTemplateAction = (templateName) => {
  deleteTemplate(templateName)
    .catch(err => {
      console.log(err);
      process.exit(1)
    })
}
module.exports = {
  createProjectAction,
  createComponentAction,
  createPageAction,
  createStoreAction,
  listTemplateAction,
  addTemplateAction,
  deleteTemplateAction,
}
