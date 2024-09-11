# npm 包的本地调试

- 需求背景：

假设我们有一个 npm 包名为 packageA，有一个项目 projectB 依赖了 packageA。

我们预期能够通过 projectB 来本地调试 packageA 的本地改动。

## 1. 在本地构建 npm 包

在 npm 包 packageA 的仓库内，执行 `pnpm run build` 命令，构建出对应的产物。

## 2. 在依赖该 npm 包的项目仓库里，把 node_modules 里的该依赖链接到本地构建的产物

### 方式一：`pnpm link`

1. 在 npm 包 packageA 的仓库内，执行 `pnpm link --global` 命令，将本地构建的产物存到全局。
2. 在依赖该 npm 包的项目仓库 projectB 内，执行 `pnpm link packageA`，来将 node_modules 里的依赖链接到已经存在全局的本地版本 packageA。（原理跟 pnpm 底层使用到的 symbolic link 一致）

### 方式二：yalc

> https://github.com/wclr/yalc

yalc 是一个专门用于本地调试 npm 包的工具，它模拟了发包的流程，通过 `yalc publish` 发布的包也是存到全局。
