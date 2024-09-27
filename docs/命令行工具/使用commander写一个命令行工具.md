# 使用 commander 写一个命令行工具

> https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md

## 常见问题

### 如何在自定义命令的处理函数里边执行其他 npm 包的命令？

要实现这一点，通常会使用 Node.js 的 child_process 模块来创建子进程并执行命令。

示例：

```javascript
#!/usr/bin/env node

const { Command } = require("commander");
const { exec } = require("child_process");

const program = new Command();

program.version("1.0.0").description("Example CLI using commander.js");

// 定义一个自定义命令
program
  .command("run <package>")
  .description("Run an npm package command")
  .action((package) => {
    // 在这里执行其他 npm 包的命令，例如 `npm install <package>`
    exec(`npm install ${package}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
      console.log(`Stdout: ${stdout}`);
    });
  });

program.parse(process.argv);
```
