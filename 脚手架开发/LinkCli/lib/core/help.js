const program = require("commander")
const helpOptions = function () {
  // 添加自己的options
  program
    .option("-l --LinkCli", "a LinkCli")
    .option("-d --dest <dest>", "a destination folder,例如：-d /src/components")
    .option("-f --framework <framework>", "your framework")

  program.on('--help', function () {
    console.log('');
    console.log('Other Options');
    console.log('others ~');
  })
}
module.exports = {
  helpOptions
}
