const program = require('commander')
const {
  createProjectAction,
  createComponentAction
} = require('./actions')
const createCommands = () => {

  program
    .command('create <project> [others...]')
    .description('clone a repository into a folder')
    .action(createProjectAction)

  program
    .command('addcpn <name>')
    .description('add a vue component,例如：addcpn helloWorld')
    .action((name)=>{
      createComponentAction(name,program.opts().dest || "/src/components")
    })
}

module.exports = {
  createCommands
}
