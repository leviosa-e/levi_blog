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
