# 使用 docsify 搭建博客

> https://docsify.js.org/#/

## 全局安装 docsify

```
npm i docsify-cli -g
```

## 使用 docsify cli 初始化项目

```
docsify init ./docs
```

## 将所有自动生成的文件移动到 docs 目录外层

这一步是为了待会儿自动生成 sidebar 时，能够保证遍历的 docs 目录里只有 markdown 文件。

docs 目录下只放我们的博客文章 markdown 文件。

现在我们的项目结构是这样的：

```
- docs
  - articleA.md
  - articleB.md
- index.html
- README.md
```

## 本地启动博客项目预览效果

因为我们调整了目录结构，所以本地启动项目时，启动的目录跟官方文档上的会有所不同。是项目的根目录，而不是 docs 目录。

```
docsify serve ./
```

## 部署到 github pages

将博客项目上传到 github 后，在 github 的博客项目仓库的 settings - page 里，开启页面部署服务，并且选择部署的目录为项目的根目录（/root）即可。

至此，博客搭建完成。
