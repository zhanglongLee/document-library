const program = require('commander')
const {
  createProjectAction,
  createComponentAction,
  createPageAction,
  createStoreAction,
  listTemplateAction,
  addTemplateAction,
  deleteTemplateAction,
} = require('./actions')
const {
  addProjectTemplate,
  listAllTemplate,
  deleteTemplate
} = require('./template-manager')
const createCommands = () => {

  program
    .command('create <project> [others...]')
    .description('clone a repository into a folder')
    .action(createProjectAction)

  program
    .command('addcpn <name>')
    .description('add a vue component,例如：addcpn helloWorld [-d src/components]')
    .action((name) => {
      createComponentAction(name, program.opts().dest || "src/components")
    })

  program
    .command('addpage <page>')
    .description('add vue page and router config,例如：addpage header [-d src/pages]')
    .action((page) => {
      createPageAction(page, program.opts().dest || `src/pages/${page}`)
    })

  program
    .command('addstore <store>')
    .description('add vue store and types config,例如：addstore nav [-d src/store]')
    .action((store) => {
      createStoreAction(store, program.opts().dest || `src/store/${store}`)
    })
  // 列出支持的项目模板
  program
    .command('list')
    .description('list all available project template')
    .action(listTemplateAction);
  // 删除一个项目模板
  program
    .command('delete <template-name>')
    .description('delete a project template')
    .action(deleteTemplateAction);
  // 新增一个项目模板
  program
    .command('add <template-name> <gitRepo-address>')
    .description('add a project template')
    .action(addTemplateAction);
}

module.exports = {
  createCommands
}
