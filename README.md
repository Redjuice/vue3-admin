# Vue 3 + Vite

### 目录结构

### 初始化项目

```
yarn create vite
```

### 配置 eslint + prettier

- vscode 安装 eslint + prettier
- 安装以下依赖

```
yarn add eslint eslint-plugin-vue eslint-config-prettier eslint-plugin-prettier prettier -D
```

`新建.eslintrc.js`

```
// 具体查看.eslintrc.js
```

`新建.prettierrc.js`

```
// 具体查看.prettierrc.js
```

`新建.vscode/settings.json`

```
{
  "editor.defaultFormatter": "esbenp.prettier-vscode", // 设置默认格式化工具为prettier
  "editor.formatOnSave": true, // 是否开启vscode的保存自动格式化
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.format.enable": true // 是否开启vscode的eslint
}
```

`修改package.json`

```
// package.json
...,
"scripts": {
    ...,
    "eslint:fix": "eslint --fix --ext .js,.vue src",
    "prettier:fix": "prettier --write ./src/../*.{less,js,json,.vue}",
    "format:all": "npm-run-all -s eslint:fix prettier:fix",
},
```

解决`找不到模块“./App.vue”或其相应的类型声明。`的错误

`新建src/shims.d.ts`

```
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}
```

如果没有效果, 可在文件首行添加`// @ts-nocheck`, 禁用检查此文件

解决 git 提交代码时`warning: LF will be replaced by CRLF in`的警告

```
// 原因是存在符号转义问题
// windows中的换行符为 CRLF， 而在linux下的换行符为LF，所以在执行add . 时出现提示，解决办法：
git config --global core.autocrlf false
```

### 配置 husky + lint-staged

[掘金: 配置 husky 和 lint-staged](https://juejin.cn/post/6982876819292684318#heading-1)

`执行以下操作`

```
// && 连接符在vscode中会报错，建议在windows的powershell执行
npx husky-init && npm install

yarn add lint-staged -D
```

`修改package.json`

```
// package.json
...,
"scripts": {
    ...,
    "lint-staged": "lint-staged"
},
"lint-staged": {
  "*.{js,vue}": [
    "npm run format:all",
    "git add ."
  ]
},
```

`修改husky/pre-commit`

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint-staged
```

### 配置 commitizen

[掘金: 使用 commitizen 实现按团队规范提交代码](https://juejin.cn/post/6898894346695737352)

```
// 全局安装commitizen插件
npm install commitizen -g

// 使用npm包cz-conventional-changelog进行初始化
commitizen init cz-conventional-changelog --save --save-exact
```

`修改package.json`

```
// package.json
...,
"scripts": {
    ...,
    "commit": "git cz"
},
```

### 配置 stylelint

[掘金: stylelint 代码自动格式化](https://juejin.cn/post/7022720509875847182#heading-0)

- vscode 安装 eslint + prettier
- 安装以下依赖

```
yarn add stylelint stylelint-config-standard stylelint-order -D
```

`新建.stylelintrc.js`

```
具体查看.stylelintrc.js
```

`修改package.json`

```
// package.json
...,
"scripts": {
  ...,
  "style:fix": "stylelint \"src/**/*.(vue|less|css)\" --fix",
  "format:all": "npm-run-all -s style:fix eslint:fix prettier:fix",
},
```

`修改.vscode/settings.json`

```
// settings.json
...,
"editor.codeActionsOnSave": {
  ...,
  "source.fixAll.stylelint": true
}
```

`可能出现的问题: Unknown word (CssSyntaxError) 错误`

因为插件版本太高, 对于 vue3 模板文件的支持不是很好，不能正确识别 .vue 文件的 css
代码。需要降级处理

```
"stylelint": "^13.13.1",
"stylelint-config-standard": "^22.0.0",
```

同时需要将 VSCode 的 stylelint 插件降级，现在插件的最新版本是 1.0.3，不支持
stylelint 13 版本。点击插件旁边的小齿轮，再点 Install Another Version，选择其他
版本进行安装。选 `0.87.6 ` 版本安装就可以了，这时 css 自动格式化功能恢复正常。

### 配置 less

Vite 也同时提供了对 .scss, .sass, .less, .styl 和 .stylus 文件的内置支持。没有必
要为它们安装特定的 Vite 插件，但必须安装相应的预处理器依赖：

```
// 如果是用的是单文件组件，可以通过 <style lang="less">自动开启。
yarn add less -D
```

### 配置 Element Plus

[自动按需导入 Element Plus](https://element-plus.gitee.io/zh-CN/guide/quickstart.html)

```
yarn add element-plus

// 自动按需导入
yarn add unplugin-vue-components -D

// 修改vite.config.js
// vite.config.ts
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default {
  plugins: [
    ...,
    // 自动按需导入Element Plus
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
}
```

### 配置 全局 configs 文件

`详情见src/configs/**/*.less`

### 配置 全局样式文件

`详情见src/styles/**/*.less`

### 配置 vite.config.js

```
具体查看vite.config.js
```

### 配置 jsconfig.json

```
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.vue", "src/**/*.js", "vite.config.js"],
  "exclude": ["node_modules", "dist"]
}
// jsconfig.json 文件来定义项目上下文时，表明该目录是 JavaScript 项目的根目录，可以配置属于项目的文件、要从项目中排除的文件以及编译器选项

// Exclude 属性(glob 模式)告诉语言服务哪些文件不是源代码的一部分。 这使性能保持在一个高水平。 如果 IntelliSense 速度慢，则向排除列表添加文件夹

// 您可以使用 include 属性(glob 模式)显式地设置项目中的文件。 如果没有 include 属性，则默认情况下包含包含目录和子目录中的所有文件。 如果指定了 include 属性，则只包含这些文件。

// 如果您的工作区中没有 jsconfig.json，VS Code 将默认排除 node_modules 文件夹

// 当你的 JavaScript 项目变得太大而且性能降低时，通常是因为类似node_modules的库文件夹。 如果 VS 代码检测到项目变得太大，它将提示您编辑exclude。
```

`jsconfig.json首行可能会报错, 设置工作区.vscode/settings.json`

```
{
  ...,
  "js/ts.implicitProjectConfig.checkJs": true // 启用或禁用javaScript文件的语义检查
}
```

### 配置 在 VS Code 中调试

[在 VS Code 中调试](https://v3.cn.vuejs.org/cookbook/debugging-in-vscode.html)

`新建.vscode/launch.json`

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "vuejs: chrome",
      "url": "http://localhost:9527",
      "webRoot": "${workspaceFolder}/src",
      "breakOnLoad": true,
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
```

### 配置 环境变量

[Vite: 环境变量和模式](https://cn.vitejs.dev/guide/env-and-mode.html)

`新建.env.[mode]文件`

- .env.[mode] # 只在指定模式下加载
- 为了防止意外地将一些环境变量泄漏到客户端，只有以 VITE\_ 为前缀的变量才会暴露给
  经过 vite 处理的代码

### 配置 Vue Router

`安装Vue Router`

```
yarn add vue-router@4
```

`新建src/views文件夹, 并创建以下页面`

```
// src/views/Home.vue
// src/views/About.vue
```

`新建src/routers/index.js`

```
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
```

`修改src/main.js`

```
...;
import router from '@/router';

app.use(router);
```

`修改src/App.vue`

```
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
```
