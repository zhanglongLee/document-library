const program = require('commander')
const {
  createProjectAction,
  createComponentAction,
  createPageAction,
  createStoreAction
} = require('./actions')
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
}

module.exports = {
  createCommands
}
