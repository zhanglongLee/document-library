const program = require("commander")
const helpOptions = function () {
  // 添加自己的options
  program
    .option("-d --dest <dest>", "a destination folder,例如：-d /src/components")
  program.on('--help', function () {
    console.log('');
    console.log('Other Options');
    console.log('others ~');
    console.log('this is the next version');
  })
}
module.exports = {
  helpOptions
}
