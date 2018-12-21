The solution to list the contents of directories in a tree-like format.
like this：

创建树形目录结构,类似这样子:

```
.
└── test
    ├── css
    │   ├── jquery-ui.css
    │   └── main.css
    ├── hide.txt
    ├── img
    │   ├── a.png
    │   └── head
    │       └── b.png
    ├── index.html
    ├── js
    │   └── index.js
    └── 说明.txt

```

## Installation

```shell
  $ npm install ctree-cli
```

## Options

**English：**

- -a All files are printed. include the files those beginning with a dot `.'.
- -d List directories only.
- -D Print the date of the last modification time for the file listed.
- -f Prints the full path prefix for each file.
- -s Print the size of each file along with the name.
- -t Sort the output by last modification time instead of alphabetically.
- -m print "node_modules" dirctory.be default it is not print

中文：

- -a 显示所有文件和目录,包括以'.'开头的文件
- -d 显示目录名称而非内容
- -D 列出文件或目录的更改时间
- -f 在每个文件或目录之前，显示完整的相对路径名称
- -s 列出文件或目录大小
- -t 用文件和目录的更改时间排序
- -m 显示 node_modules 目录树，默认不显示。显示 node_modules 会消耗非常多的时间

## example

```shell
cd test
ctree-cli -a
```

result:

```
.
|-test
  |-.babelrc
  |-css
    |-jquery-ui.css
    |-main.css
  |-hide.txt
  |-img
      |-a.png
      |-head
        |-b.png
  |-index.html
  |-js
          |-index.js
  |-show.txt
  |-说明.txt
```
