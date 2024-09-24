# 运行 Shell 脚本

## 如何运行 Shell 脚本

以在 `Bash` 中运行 `Shell` 脚本举例：

### 1. 编写 Shell 脚本

首先，使用文本编辑器（如 `nano`、`vim` 或 `gedit`）编写你的 Shell 脚本。例如，创建一个名为 `script.sh` 的文件：

```sh
#!/bin/bash

echo "Hello, World!"
```

### 2. 保存并关闭文件

确保脚本文件保存为 `.sh` 扩展名，并保存到你希望的目录中。

### 3. 赋予执行权限

在终端中，导航到包含脚本文件的目录，并使用 `chmod` 命令赋予脚本执行权限：

```sh
chmod +x script.sh
```

### 4. 运行脚本

有几种方法可以运行脚本：

#### 方法 1: 直接运行

在终端中，导航到包含脚本文件的目录，然后使用以下命令运行脚本：

```sh
./script.sh
```

#### 方法 2: 使用 `bash` 命令运行

你也可以通过显式调用 `bash` 来运行脚本：

```sh
bash script.sh
```

#### 方法 3: 使用 `sh` 命令运行

尽管脚本是用 `bash` 编写的，但它们通常也可以使用 `sh` 运行：

```sh
sh script.sh
```

### 注意事项

- **Shebang**: `#!/bin/bash` 是一个 shebang 行，它告诉系统使用哪种解释器来运行脚本。在这个例子中，使用的是 Bash。
- **路径**: 确保你在运行脚本时使用了正确的路径。如果脚本不在当前目录，可以使用相对路径或绝对路径。
- **权限**: 如果你没有赋予脚本执行权限，可能会遇到 `Permission denied` 错误。

## 如何往 Shell 脚本里传递参数

### 方法 1: 使用位置参数

位置参数是传递给脚本的命令行参数，可以在脚本中通过 `$1`, `$2`, `$3` 等变量访问。

#### 编写脚本

创建一个名为 `script.sh` 的脚本文件：

```sh
#!/bin/bash

echo "First argument: $1"
echo "Second argument: $2"
```

#### 运行脚本并传递参数

在终端中运行脚本时传递参数：

```sh
./script.sh arg1 arg2
```

输出将会是：

```
First argument: arg1
Second argument: arg2
```

### 方法 2: 使用环境变量

你可以在运行脚本之前设置环境变量，然后在脚本中访问这些变量。

#### 编写脚本

创建一个名为 `script.sh` 的脚本文件：

```sh
#!/bin/bash

echo "Environment variable VAR1: $VAR1"
echo "Environment variable VAR2: $VAR2"
```

#### 运行脚本并传递环境变量

在终端中运行脚本时设置环境变量：

```sh
VAR1=value1 VAR2=value2 ./script.sh
```

输出将会是：

```
Environment variable VAR1: value1
Environment variable VAR2: value2
```

### 方法 3: 使用 `read` 命令和命令行输入

你可以在脚本中使用 `read` 命令来从命令行读取输入。

#### 编写脚本

创建一个名为 `script.sh` 的脚本文件：

```sh
#!/bin/bash

echo "Enter the first variable:"
read VAR1
echo "Enter the second variable:"
read VAR2

echo "First variable: $VAR1"
echo "Second variable: $VAR2"
```

#### 运行脚本并输入变量

在终端中运行脚本并输入变量：

```sh
./script.sh
```

脚本将提示你输入变量值：

```
Enter the first variable:
value1
Enter the second variable:
value2
First variable: value1
Second variable: value2
```

### 方法 4: 使用命令行选项和 `getopts`

`getopts` 是一个内置命令，用于解析命令行选项。

#### 编写脚本

创建一个名为 `script.sh` 的脚本文件：

```sh
#!/bin/bash

while getopts "a:b:" opt; do
  case $opt in
    a)
      VAR1=$OPTARG
      ;;
    b)
      VAR2=$OPTARG
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      ;;
  esac
done

echo "Variable a: $VAR1"
echo "Variable b: $VAR2"
```

#### 运行脚本并传递选项

在终端中运行脚本并传递选项：

```sh
./script.sh -a value1 -b value2
```

输出将会是：

```
Variable a: value1
Variable b: value2
```
