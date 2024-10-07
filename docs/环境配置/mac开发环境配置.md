# mac 开发环境配置

## 1. 下载安装 VS Code

## 2. 配置 git 以及 SSH 秘钥

配置用户名及邮箱：
```
git config --global user.name "username"
git config --global user.email "username@email.com"
```

生成 SSH 秘钥：
```
ssh-keygen -t rsa
```

查看秘钥：
```
cd .ssh

cat id_rsa.pub
```

将公钥复制出来，粘贴到 github 上的 SSH 配置项里即可。

## 3. 安装 oh-my-zsh

> https://www.haoyep.com/posts/zsh-config-oh-my-zsh/

国内镜像：
```
sh -c "$(curl -fsSL https://gitee.com/pocmon/ohmyzsh/raw/master/tools/install.sh)"
```

## 4. 安装 Node.js

npm 设置国内镜像源：
```
npm config set registry https://registry.npmmirror.com
```

### 执行 `npm install` 时报错无权限

```bash
npm i -g pnpm
npm error code EACCES
npm error syscall mkdir
npm error path /usr/local/lib/node_modules/pnpm
npm error errno -13
npm error Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules/pnpm'
npm error     at async mkdir (node:internal/fs/promises:858:10)
npm error     at async /usr/local/lib/node_modules/npm/node_modules/@npmcli/arborist/lib/arborist/reify.js:624:20
npm error     at async Promise.allSettled (index 0)
npm error     at async [reifyPackages] (/usr/local/lib/node_modules/npm/node_modules/@npmcli/arborist/lib/arborist/reify.js:325:11)
npm error     at async Arborist.reify (/usr/local/lib/node_modules/npm/node_modules/@npmcli/arborist/lib/arborist/reify.js:142:5)
npm error     at async Install.exec (/usr/local/lib/node_modules/npm/lib/commands/install.js:150:5)
npm error     at async Npm.exec (/usr/local/lib/node_modules/npm/lib/npm.js:207:9)
npm error     at async module.exports (/usr/local/lib/node_modules/npm/lib/cli/entry.js:74:5) {
npm error   errno: -13,
npm error   code: 'EACCES',
npm error   syscall: 'mkdir',
npm error   path: '/usr/local/lib/node_modules/pnpm'
npm error }
npm error
npm error The operation was rejected by your operating system.
npm error It is likely you do not have the permissions to access this file as the current user
npm error
npm error If you believe this might be a permissions issue, please double-check the
npm error permissions of the file and its containing directories, or try running
npm error the command again as root/Administrator.
npm notice
npm notice New minor version of npm available! 10.8.2 -> 10.9.0
npm notice Changelog: https://github.com/npm/cli/releases/tag/v10.9.0
npm notice To update run: npm install -g npm@10.9.0
npm notice
npm error A complete log of this run can be found in: /Users/leviosa/.npm/_logs/2024-10-07T14_52_59_821Z-debug-0.log
```

- 解决方案：

> https://github.com/WangYang-Rex/Web/issues/26

把对应目录文件夹权限改成管理员即可。

```bash
sudo chown -R <user> /usr/local/lib/node_modules/
```

`sudo chown -R <user> /usr/local/lib/node_modules/` 是一个在类 Unix 系统（如 Linux、macOS）上执行的命令，其含义如下：

1. `sudo`：以超级用户权限执行后续命令。这是为了有权限修改系统中的某些文件和目录的所有权。

2. `chown`：是“change owner”的缩写，用于改变文件或目录的所有者。

3. `-R`：这是一个选项，表示递归地应用所有权更改。即不仅改变指定目录本身的所有者，还会对该目录下的所有子目录和文件进行所有权更改。

4. `user`：指定要将所有权更改为的用户。这个用户应该是系统中已存在的用户。
