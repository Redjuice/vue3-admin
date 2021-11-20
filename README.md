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
module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  parser: 'vue-eslint-parser', // 指定如何解析语法
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended'
  ],
  rules: {}
};
```

`新建.prettierrc.js`

```
module.exports = {
  printWidth: 80, // 单行输出（不折行）的（最大）长度
  tabWidth: 2, // 每个缩进级别的空格数
  semi: true, // 是否在语句末尾打印分号
  singleQuote: true, // 是否使用单引号
  quoteProps: 'as-needed', // 仅在需要时在对象属性周围添加引号
  bracketSpacing: true, // 是否在对象属性添加空格
  htmlWhitespaceSensitivity: 'ignore', // 指定 HTML 文件的全局空白区域敏感度, "ignore" - 空格被认为是不敏感的
  trailingComma: 'none', // 去除对象最末尾元素跟随的逗号  useTabs: false, // 不使用缩进符，而使用空格
  jsxSingleQuote: false, // jsx 不使用单引号，而使用双引号
  arrowParens: 'always', // 箭头函数，只有一个参数的时候，也需要括号
  rangeStart: 0, // 每个文件格式化的范围是文件的全部内容
  proseWrap: 'always', // 当超出print width（上面有这个参数）时就折行
  endOfLine: 'lf' // 换行符使用 lf
};
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

解决`找不到模块“./App.vue”或其相应的类型声明。`的错误

`新建src/shims.d.ts`

```
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}
```

解决 git 提交代码时`warning: LF will be replaced by CRLF in`的警告

```
// 原因是存在符号转义问题
// windows中的换行符为 CRLF， 而在linux下的换行符为LF，所以在执行add . 时出现提示，解决办法：
git config --global core.autocrlf false
```

### 配置 husky + lint-staged

`执行以下操作`

```
// && 连接符在vscode中会报错，建议在windows的powershell执行
npx husky-init && npm install

yarn add lint-staged -D
```

`修改package.json`

```
// package.json
...
"scripts": {
    ...
    "lint-staged": "lint-staged"
},
"lint-staged": {
  "*.{js,vue}": [
    "eslint --fix --ext .js,.vue src",
    "prettier --write ./src/*.{less,js,json,.vue}",
    "git add ."
  ]
}
```

`修改husky/pre-commit`

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint-staged
```
