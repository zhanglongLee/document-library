/**
 * 执行终端命令相关的代码
 */

// 开启子进程
const { spawn } = require('child_process')

const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args)
    // 将子线程的输出结果放到主线程
    childProcess.stdout.pipe(process.stdout)
    // 将子线程的错误输出结果放到主线程
    childProcess.stderr.pipe(process.stderr)
    childProcess.on("close", (code) => {
      process.stdin.end();
      resolve(code)
    })
  })
}

module.exports = {
  commandSpawn
}
