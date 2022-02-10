/**
 * 执行终端命令相关的代码
 */

// 开启子进程
const { spawn } = require('child_process')

const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args)
    childProcess.stdout.on('data', (data) => {
      process.stdin.write(data);
    });
    childProcess.stderr.on('data', (data) => {
      process.stdin.write(data);
    });
    // childProcess.stdout.pipe(process.stdout)
    // childProcess.stderr.pipe(process.stderr)
    childProcess.on("close", (code) => {
      process.stdin.end();
      resolve(code)
    })
  })
}

module.exports = {
  commandSpawn
}
