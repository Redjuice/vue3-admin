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
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
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

- vscode 安装 eslint + prettier
- 安装以下依赖

```
yarn add stylelint stylelint-config-standard stylelint-order -D
```

`新建.stylelintrc.js`

```
module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-order'],
  // 设定需要忽略的文件
  ignoreFiles: ['dist/**/*'],
  rules: {
    // 颜色指定小写
    'color-hex-case': 'lower',
    // 禁止空块
    'block-no-empty': true,
    // 颜色6位长度
    'color-hex-length': 'long',
    // 兼容自定义标签名
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: []
      }
    ],
    // 忽略伪类选择器 ::v-deep
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ],
    // 禁止低优先级的选择器出现在高优先级的选择器之后。
    'no-descending-specificity': null,
    // 不验证@未知的名字，为了兼容scss的函数
    'at-rule-no-unknown': null,
    // 禁止空注释
    'comment-no-empty': true,
    // 禁止简写属性的冗余值
    'shorthand-property-no-redundant-values': true,
    // 禁止值的浏览器引擎前缀
    'value-no-vendor-prefix': true,
    // property-no-vendor-prefix
    'property-no-vendor-prefix': true,
    // 允许小于 1 的小数有一个前导零
    'number-leading-zero': 'always',
    // 禁止空第一行
    'no-empty-first-line': true,
    // 关闭 不允许重复的选择器 的验证
    'no-duplicate-selectors': null,
    // 属性的排序
    'order/properties-order': [
      // 布局属性
      'display',
      'visibility',
      'overflow',
      'overflow-x',
      'overflow-y',
      'overscroll-behavior',
      'scroll-behavior',
      'scroll-snap-type',
      'scroll-snap-align',
      // 布局属性：浮动
      'float',
      'clear',
      // 布局属性：定位
      'position',
      'left',
      'right',
      'top',
      'bottom',
      'z-index',
      // 布局属性：列表
      'list-style',
      'list-style-type',
      'list-style-position',
      'list-style-image',
      // 布局属性：表格
      'table-layout',
      'border-collapse',
      'border-spacing',
      'caption-side',
      'empty-cells',
      // 布局属性：弹性
      'flex-flow',
      'flex-direction',
      'flex-wrap',
      'justify-content',
      'align-content',
      'align-items',
      'align-self',
      'flex',
      'flex-grow',
      'flex-shrink',
      'flex-basis',
      'order',
      // 布局属性：多列
      'columns',
      'column-width',
      'column-count',
      'column-gap',
      'column-rule',
      'column-rule-width',
      'column-rule-style',
      'column-rule-color',
      'column-span',
      'column-fill',
      'column-break-before',
      'column-break-after',
      'column-break-inside',
      // 布局属性：格栅
      'grid-columns',
      'grid-rows',
      // 尺寸属性
      'box-sizing',
      'margin',
      'margin-left',
      'margin-right',
      'margin-top',
      'margin-bottom',
      'padding',
      'padding-left',
      'padding-right',
      'padding-top',
      'padding-bottom',
      'border',
      'border-width',
      'border-style',
      'border-color',
      'border-colors',
      'border-left',
      'border-left-width',
      'border-left-style',
      'border-left-color',
      'border-left-colors',
      'border-right',
      'border-right-width',
      'border-right-style',
      'border-right-color',
      'border-right-colors',
      'border-top',
      'border-top-width',
      'border-top-style',
      'border-top-color',
      'border-top-colors',
      'border-bottom',
      'border-bottom-width',
      'border-bottom-style',
      'border-bottom-color',
      'border-bottom-colors',
      'border-radius',
      'border-top-left-radius',
      'border-top-right-radius',
      'border-bottom-left-radius',
      'border-bottom-right-radius',
      'border-image',
      'border-image-source',
      'border-image-slice',
      'border-image-width',
      'border-image-outset',
      'border-image-repeat',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      // 界面属性
      'appearance',
      'outline',
      'outline-width',
      'outline-style',
      'outline-color',
      'outline-offset',
      'outline-radius',
      'outline-radius-topleft',
      'outline-radius-topright',
      'outline-radius-bottomleft',
      'outline-radius-bottomright',
      'background',
      'background-color',
      'background-image',
      'background-repeat',
      'background-repeat-x',
      'background-repeat-y',
      'background-position',
      'background-position-x',
      'background-position-y',
      'background-size',
      'background-origin',
      'background-clip',
      'background-attachment',
      'bakground-composite',
      'mask',
      'mask-mode',
      'mask-image',
      'mask-repeat',
      'mask-repeat-x',
      'mask-repeat-y',
      'mask-position',
      'mask-position-x',
      'mask-position-y',
      'mask-size',
      'mask-origin',
      'mask-clip',
      'mask-attachment',
      'mask-composite',
      'mask-box-image',
      'mask-box-image-source',
      'mask-box-image-width',
      'mask-box-image-outset',
      'mask-box-image-repeat',
      'mask-box-image-slice',
      'box-shadow',
      'box-reflect',
      'filter',
      'mix-blend-mode',
      'opacity',
      'object-fit',
      'clip',
      'clip-path',
      'resize',
      'zoom',
      'cursor',
      'pointer-events',
      'user-modify',
      'user-focus',
      'user-input',
      'user-select',
      'user-drag',
      // 文字属性
      'line-height',
      'line-clamp',
      'vertical-align',
      'direction',
      'unicode-bidi',
      'writing-mode',
      'ime-mode',
      'text-overflow',
      'text-decoration',
      'text-decoration-line',
      'text-decoration-style',
      'text-decoration-color',
      'text-decoration-skip',
      'text-underline-position',
      'text-align',
      'text-align-last',
      'text-justify',
      'text-indent',
      'text-stroke',
      'text-stroke-width',
      'text-stroke-color',
      'text-shadow',
      'text-transform',
      'text-size-adjust',
      'src',
      'font',
      'font-family',
      'font-style',
      'font-stretch',
      'font-weight',
      'font-variant',
      'font-size',
      'font-size-adjust',
      'color',
      // 内容属性
      'tab-size',
      'overflow-wrap',
      'word-wrap',
      'word-break',
      'word-spacing',
      'letter-spacing',
      'white-space',
      'caret-color',
      'quotes',
      'content',
      'content-visibility',
      'counter-reset',
      'counter-increment',
      'page',
      'page-break-before',
      'page-break-after',
      'page-break-inside',
      // 交互属性
      'will-change',
      'perspective',
      'perspective-origin',
      'backface-visibility',
      'transform',
      'transform-origin',
      'transform-style',
      'transition',
      'transition-property',
      'transition-duration',
      'transition-timing-function',
      'transition-delay',
      'animation',
      'animation-name',
      'animation-duration',
      'animation-timing-function',
      'animation-delay',
      'animation-iteration-count',
      'animation-direction',
      'animation-play-state',
      'animation-fill-mode',
      // Webkit专有属性
      '-webkit-overflow-scrolling',
      '-webkit-box-orient',
      '-webkit-line-clamp',
      '-webkit-text-fill-color',
      '-webkit-tap-highlight-color',
      '-webkit-touch-callout',
      '-webkit-font-smoothing',
      '-moz-osx-font-smoothing'
    ]
  }
};

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
/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import configs from './src/configs';

// https://vitejs.dev/config/
export default ({ mode }) => {
  // 获取环境变量
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const { VITE_APP_API_ROOT } = process.env;
  return defineConfig({
    plugins: [
      ...
    ],
    css: {
      // 指定传递给 CSS 预处理器的选项
      preprocessorOptions: {
        less: {
          javascriptEnabled: true, // 支持内联JavaScript
          additionalData: `@import "@/styles/index.less";` // 引入全局样式
        }
      }
    },
    resolve: {
      // 别名
      alias: {
        '@': resolve(__dirname, 'src') // src路径
      }
    },
    // 开发服务器选项
    server: {
      port: configs.devPort, // 指定开发服务器端口
      open: configs.devOpen, // 自动打开浏览器
      // 为开发服务器配置自定义代理规则
      proxy: {
        '/api': {
          target: VITE_APP_API_ROOT, //配置你要请求的服务器地址
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  });
};
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

`jsconfig.json首行可能会报错, 设置.vscode/settings.json`

```
{
  ...,
  "js/ts.implicitProjectConfig.checkJs": true // 启用或禁用javaScript文件的语义检查
}

```
