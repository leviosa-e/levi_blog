# 自动生成 sidebar

## 问题背景

docsify cli 提供的自动生成 sidebar 的功能对 Windows 用户来说并不好用，它会把盘符作为父级，并且每一篇文档的路径都是系统的绝对路径，路径中的每一级又是用反斜杠 \ 划分的，在浏览器的 url 里并不适用。

于是我向 chatgpt 输入了我的需求：“如何用 nodejs 遍历文件夹，并且按照文件的层级关系生成一个 markdown 文件记录他们的文件路径”，并且经过简单的调整，就得到了一个能够简单满足我的需求的脚本：

```
// auto_generate_sidebar.js

const fs = require("fs");
const path = require("path");

const mdFileSuffix = ".md";

// 遍历文件夹的递归函数
function traverseDirectory(
  dir,
  depth = 0,
  fileList = [],
  currentFilePath = ""
) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    const indent = "  ".repeat(depth); // 根据层级生成缩进

    if (stats.isDirectory()) {
      fileList.push(`${indent}- ${file}`); // 目录后面加斜杠
      traverseDirectory(
        filePath,
        depth + 1,
        fileList,
        currentFilePath + filePath
      ); // 递归遍历子文件夹
    } else {
      fileList.push(
        `${indent}- [${file.replace(mdFileSuffix, "")}](${(
          currentFilePath.replace(__dirname, "") +
          "\\" +
          file
        ).replaceAll("\\", "/")})`
      );
    }
  });

  return fileList;
}

// 主函数
function main() {
  const directoryPath = path.join(__dirname, "docs"); // 替换为你的文件夹路径
  const outputFilePath = path.join(__dirname, "_sidebar.md"); // 输出 Markdown 文件路径

  // 遍历文件夹
  const fileList = traverseDirectory(directoryPath);

  // 将文件列表写入 Markdown 文件
  fs.writeFileSync(outputFilePath, fileList.join("\n"), "utf-8");

  console.log(`File structure has been saved to ${outputFilePath}`);
}

// 执行主函数
main();

```

## 使用方式

目前的使用方式还比较简陋，需要我在每次编辑完文档，准备 git push 前，手动执行一下脚本，更新 sidebar。

后续可以考虑在每次 VS Code 里保存文件时都自动执行一次，或者 git push 前自动执行一次。
