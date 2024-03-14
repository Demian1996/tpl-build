# react 项目运行工具

## 简介

该项目包含命令行工具本体 tpl-build 和一个演示工具效果的 demo。
通过该命令行工具，demo 项目只需要写 react 代码，关注业务逻辑本身，不需要关注构建配置。

## 构建和全局安装工具

```shell
cd tpl-build
npm install
npm run build
```

执行后，tpl-build 包会被 yalc 安装到电脑的`~/.yalc`目录

## 运行

```shell
cd demo
npm install
npm run dev
```

安装完成后，demo 会使用 tpl-build 构建和运行。

## 开发

```shell
cd tpl-build
npm install
npm run watch // 每次修改源码后，触发yalc push
cd ../demo
npm install
npm run build // 尝试运行最新的命令行工具代码
```

## 目录

tpl-build 目录如下：

```txt
├── bin
│   └── tpl-build.js - 命令行执行脚本
├── lib
│   ├── build.js - 命令行工具本身构建后的bundle
│   └── template - 存放html模版
├── package.json
├── rollup.config.js - 构建命令行工具的rollup配置
├── src
│   ├── Builder.ts - 命令行工具编译项目的核心逻辑
│   ├── ConfigProvider.ts - 加载dev和prod需要的各种配置
│   ├── constant.ts - 常量
│   ├── index.ts - 入口
│   ├── internals - 存放babel、webpack等配置的目录
│   └── utils - 存放工具脚本的目录
└── tsconfig.json
```

demo 目录如下：

```txt
├── package.json
├── src
│ ├── index.less - 示例样式文件
│ └── index.tsx - 示例代码
└── tsconfig.json
```
