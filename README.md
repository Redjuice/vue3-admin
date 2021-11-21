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

### 配置 commitizen

```
// 全局安装commitizen插件
npm install commitizen -g

// 使用npm包cz-conventional-changelog进行初始化
commitizen init cz-conventional-changelog --save --save-exact
```

`修改package.json`

```
// package.json
...
"scripts": {
    ...
    "commit": "git cz"
},
```

### 配置 stylelint

- vscode 安装 eslint + prettier
- 安装以下依赖

```
yarn add stylelint stylelint-config-standard stylelint-order -D
```

`新建.stylelintrc.js`

```
module.exports = {
  "extends": [
    "stylelint-config-standard"
  ],
  "plugins": [
    "stylelint-order"
  ],
  // 设定需要忽略的文件
  ignoreFiles: ["dist/**/*"],
  "rules": {
    // 颜色指定小写
    'color-hex-case': 'lower',
    // 禁止空块
    'block-no-empty': true,
    // 颜色6位长度
    "color-hex-length": "long",
    // 兼容自定义标签名
    "selector-type-no-unknown": [true, {
      "ignoreTypes": []
    }],
    // 忽略伪类选择器 ::v-deep
    "selector-pseudo-element-no-unknown": [true, {
      "ignorePseudoElements": ["v-deep"]
    }],
    // 禁止低优先级的选择器出现在高优先级的选择器之后。
    "no-descending-specificity": null,
    // 不验证@未知的名字，为了兼容scss的函数
    "at-rule-no-unknown": null,
    // 禁止空注释
    "comment-no-empty": true,
    // 禁止简写属性的冗余值
    "shorthand-property-no-redundant-values": true,
    // 禁止值的浏览器引擎前缀
    "value-no-vendor-prefix": true,
    // property-no-vendor-prefix
    "property-no-vendor-prefix": true,
    // 禁止小于 1 的小数有一个前导零
    "number-leading-zero": "never",
    // 禁止空第一行
    "no-empty-first-line": true,
    // 属性的排序
    "order/properties-order": [
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "z-index",
      "display",
      "justify-content",
      "align-items",
      "float",
      "clear",
      "overflow",
      "overflow-x",
      "overflow-y",
      "margin",
      "margin-top",
      "margin-right",
      "margin-bottom",
      "margin-left",
      "border",
      "border-style",
      "border-width",
      "border-color",
      "border-top",
      "border-top-style",
      "border-top-width",
      "border-top-color",
      "border-right",
      "border-right-style",
      "border-right-width",
      "border-right-color",
      "border-bottom",
      "border-bottom-style",
      "border-bottom-width",
      "border-bottom-color",
      "border-left",
      "border-left-style",
      "border-left-width",
      "border-left-color",
      "border-radius",
      "padding",
      "padding-top",
      "padding-right",
      "padding-bottom",
      "padding-left",
      "width",
      "min-width",
      "max-width",
      "height",
      "min-height",
      "max-height",
      "font-size",
      "font-family",
      "font-weight",
      "text-align",
      "text-justify",
      "text-indent",
      "text-overflow",
      "text-decoration",
      "white-space",
      "color",
      "background",
      "background-position",
      "background-repeat",
      "background-size",
      "background-color",
      "background-clip",
      "opacity",
      "filter",
      "list-style",
      "outline",
      "visibility",
      "box-shadow",
      "text-shadow",
      "resize",
      "transition"
    ],
  }
}
```

`修改package.json`

```
// package.json
...
"scripts": {
  ...
  "style:fix": "stylelint \"src/**/*.(vue|less|css)\" --fix",
  "format:all": "npm-run-all -s eslint:fix prettier:fix style:fix",
},
"lint-staged": {
  "*.{js,vue,less}": [
    ...,
    "stylelint \"src/**/*.(vue|less|css)\" --fix"
  ]
},
```

`修改.vscode/settings.json`

```
// settings.json
...
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
