const chalk = require('chalk');
const inquirer = require('inquirer');
const isGitUrl = require('is-git-url');
const { stopSpinner } = require('../utils/spinner');
const { getRealGitRepo } = require('../utils/utils')
const {
  readTemplateJson,
  writeTemplateJson
} = require('../utils/readTemplateData');

// 新增模板
async function addProjectTemplate(templateName, gitRepoAddress) {
  const templateGitRepoJson = readTemplateJson();
  if (templateGitRepoJson[templateName]) {
    console.log(`  ` + chalk.red(`template name ${templateName} has exists.`));
    return;
  }
  if (!isGitUrl(gitRepoAddress)) {
    console.log(
      `  ` +
      chalk.red(
        `git repo address ${gitRepoAddress} is not a correct git repo.`
      )
    );
    return;
  }
  templateGitRepoJson[templateName] = {
    github: gitRepoAddress,
  };
  writeTemplateJson(templateGitRepoJson);
  stopSpinner();
  console.log();
  console.log(`🎉  Successfully add project template ${chalk.yellow(templateName)}.`);
  console.log();
}

// 显示模板列表
async function listAllTemplate() {
  const templateGitRepoJson = readTemplateJson();
  console.log();
  for (let key in templateGitRepoJson) {
    stopSpinner();
    console.log(
      `->  Template name ${chalk.yellow(key)},  Template address ${chalk.yellow(
        templateGitRepoJson[key]['github']
      )}`
    );
  }
  if (!Object.keys(templateGitRepoJson).length) {
    console.log();
    console.log(`💔  No any template.`);
    console.log();
  }
  console.log();
}

// 删除对应模板
async function deleteTemplate(templateName) {
  const templateGitRepoJson = readTemplateJson();
  if (!templateGitRepoJson[templateName]) {
    console.log(
      `  ` + chalk.red(`template name ${templateName} has not exists.`)
    );
    return;
  }
  const { ok } = await inquirer.prompt([
    {
      name: 'ok',
      type: 'confirm',
      message: `Make sure you want to delete template name ${chalk.yellow(templateName)}?`
    }
  ]);
  if (!ok) {
    return;
  }
  delete templateGitRepoJson[templateName];
  writeTemplateJson(templateGitRepoJson);
  stopSpinner();
  console.log();
  console.log(
    `🎉  Successfully delete project template ${chalk.yellow(templateName)}.`
  );
  console.log();
}

// 选择需要下载的模板
async function chooseTemplate() {
  const templateGitRepoJson = readTemplateJson();
  const keys = Object.keys(templateGitRepoJson)
  let gitRepoAddress = ''
  const promptList = [{
    type: 'list',
    message: 'Please select template',
    name: 'templateName',
    choices: keys,
  }];
  try {
    const { templateName } = await inquirer.prompt(promptList)
    console.log();
    console.log(`✨ you select the ${chalk.yellow(templateName)} template.`);
    console.log();
    gitRepoAddress = getRealGitRepo(templateGitRepoJson[templateName]['github'])
  } catch (error) {
    console.log(error);
  }
  return gitRepoAddress
}

module.exports = {
  addProjectTemplate,
  listAllTemplate,
  deleteTemplate,
  chooseTemplate
};
