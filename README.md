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
"scripts": {
  ...,
  "eslint:fix": "eslint --fix --ext .js,.vue src",
  "prettier:fix": "prettier --write ./src/../*.{less,js,json,.vue}",
  "format:all": "npm run eslint:fix && npm run prettier:fix",
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
[知乎: husky 使用总结](https://zhuanlan.zhihu.com/p/366786798)

`执行以下操作`

```
// && 连接符在vscode中会报错，建议在windows的powershell执行
npx husky-init && npm install

yarn add lint-staged -D
```

`修改package.json`

```
// package.json
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

### 配置 commitlint

[简书: 代码提交规范 husky + commitlint + lint-staged](https://www.jianshu.com/p/6653f467e993)

`安装依赖`

```
yarn add @commitlint/cli @commitlint/config-conventional -D
```

`新建commitlint.config.js或.commitlintrc.js`

```
// 具体查看.commitlintrc.js
```

`新建.husky/commit-msg`

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit $1
```

`或者修改.husky/pre-commit`

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint-staged
npx --no-install commitlint --edit $1
```

### 配置 commitizen

```
// 全局安装
// 它会提供 git cz 命令替代我们的 git commit命令，帮助我们更加方便生成符合规范的 commit message。
npm install -g commitizen

// 项目中安装
// commitizen 的首选适配器
yarn add cz-conventional-changelog -D
```

`修改package.json`

```
// package.json
"scripts": {
  ...,
  "commit": "git cz"
},
"config": {
  "commitizen": {
    "path": "node_modules/cz-conventional-changelog"
  }
}
```

`执行 git cz 或者 yarn commit 提交代码`

### 配置 自定义 commitizen 提交规范(cz-customizable 适配器)

`安装依赖`

```
yarn add cz-customizable -D
```

`修改package.json`

```
// package.json
"scripts": {
  ...,
  "commit": "git cz"
},
"config": {
  "commitizen": {
    "path": "node_modules/cz-customizable"
  }
}
```

`新建.cz-config.js`

```
module.exports = {
  types: [
    { value: 'init', name: '🎉init: 初始提交' },
    { value: 'feat', name: '✨feat: 增加新功能' },
    { value: 'ui', name: '🌻ui: 更新UI' },
    { value: 'fix', name: '🐛fix: 修复bug' },
    { value: 'perf', name: '⚡️perf: 性能优化' },
    { value: 'refactor', name: '♻️refactor: 代码重构' },
    { value: 'chore', name: '🛠️chore: 更改配置文件' },
    { value: 'add', name: '➕add: 添加依赖' },
    { value: 'del', name: '❌del: 删除代码/文件' },
    { value: 'style', name: '🎨style: 样式修改不影响逻辑' },
    { value: 'docs', name: '📝docs: 修改文档' },
    { value: 'test', name: '✅test: 增加测试' },
    { value: 'revert', name: '⏪revert: 版本回退' },
    { value: 'release', name: '⌨️release: 发布' },
    { value: 'deploy', name: '👷deploy: 部署' }
  ],
  messages: {
    type: '选择更改类型:\n',
    subject: '简短描述:\n',
    body: '详细描述. 使用"|"换行:\n',
    confirmCommit: '确认提交?'
  },
  skipQuestions: ['scope', 'footer']
};
```

`执行 git cz 或者 yarn commit 提交代码`

### 配置 自定义 commitizen 提交规范(git-cz 适配器)

`安装依赖`

```
yarn add git-cz -D
```

`修改package.json`

```
// package.json
"scripts": {
  ...,
  "commit": "git-cz"
},
"config": {
  "commitizen": {
    "path": "git-cz"
  }
}

```

`新建changelog.config.js`

```
具体查看 changelog.config.js
```

`执行 yarn commit 或者 npx git-cz 提交代码`

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
"scripts": {
  ...,
  "style:fix": "stylelint \"src/**/*.(vue|less|css)\" --fix",
  "format:all": "npm run style:fix && npm run eslint:fix && npm run prettier:fix",
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
yarn add unplugin-vue-components vite-plugin-style-import -D

// 修改vite.config.js
// vite.config.ts
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default {
  plugins: [
    ...,
    // 自动按需导入Element Plus的组件
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    // 自动按需导入Element Plus的css样式
    styleImport({
        libs: [
          {
            libraryName: 'element-plus',
            esModule: true,
            resolveStyle: (name) => {
              return `element-plus/theme-chalk/${name}.css`;
            }
          }
        ]
      })
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

`新建src/routes/index.js`

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
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const goAbout = () => {
  router.push('/about');
};
</script>

<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link>
      |
      <router-link to="/about">About</router-link>
      |
      <div @click="goAbout">goAbout</div>
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  margin-top: 60px;
  text-align: center;
  color: @primary-color;

  #nav {
    .flex-center();
    cursor: pointer;
  }
}
</style>
```

### 配置 Vuex

`安装Vuex`

```
yarn add vuex@next
```

`新建src/store/index.js `

```
import { createStore } from 'vuex';

export default createStore({
  // 单一状态树
  state: {
    count: 0
  },
  // getters 暴露出去计算属性
  getters: {
    doubleCount: (state) => state.count * 2
  },
  // mutations 同步方法
  mutations: {
    increment(state, value) {
      state.count += value;
    }
  },
  // actions 异步方法
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment', 1);
      }, 1000);
    }
  }
});
```

`修改src/main.js`

```
...;
import store from '@/store';

app.use(store);
```

`修改src/App.vue`

```
<script setup>
import { computed } from 'vue';
...
const { state, getters, commit, dispatch } = useStore();
const count = computed(() => state.count);
const doubleCount = computed(() => getters.doubleCount);
const increment = () => {
  commit('increment', 1);
};
const incrementAsync = () => {
  dispatch('incrementAsync', 1);
};
</script>

<template>
  <div id="app">
    ...
    <div>count: {{ count }}</div>
    <div>doubleCount: {{ doubleCount }}</div>
    <el-button @click="increment">increment</el-button>
    <el-button @click="incrementAsync">incrementAsync</el-button>
  </div>
</template>
```

### 配置公共指令

`新建src/directives文件夹`

```
// 具体查看src/directives

// src/directives/index.js, 暴露一个 install 方法, 用于注册全局指令
```

`修改main.js, 注册全局指令`

```
import directives from '@/directives';

app.use(directives);
```

### 配置公共过滤器

`vue3已经抛弃过滤器, 可以使用以下方式变通实现`

`新建src/filters文件夹`

```
// 具体查看src/filters

// src/directives/index.js, 暴露一个 install 方法, 用于注册全局过滤器
```

`修改main.js, 注册全局过滤器`

```
import filters from '@/filters';

app.use(filters);
```

`使用`

```
// 在template中使用
{{ $filters.formatDate(1637749950) }}

// 在script中使用
import {  getCurrentInstance } from 'vue';

const {
  appContext: {
    config: {
      globalProperties: { $filters }
    }
  }
} = getCurrentInstance();

$filters.formatDate(1637749950);
```

### 配置 axios

`安装`

```
yarn add axios
```

`新建utils/https.js文件夹`

```
// 具体查看utils/https.js
```

`使用`

```
// 具体查看aips/*.js
```

### 配置 plop

什么是 plop？一个微型生成器框架，用于生成符合团队规范的模板文件。

具体配置方法查看[这里](https://juejin.cn/post/7005576878190755847)

---

下面是具体业务的实现

---
