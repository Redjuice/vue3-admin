const { notEmpty } = require('../utils.js');

module.exports = {
  description: '创建 component',
  // 提示，用于捕获用户输入
  prompts: [
    {
      type: 'input', // 交互类型
      name: 'path', // 参数名称
      message: '请输入组件路径(可以为空)：' // 交互提示
    },
    {
      type: 'input',
      name: 'name',
      message: '请输入组件名称：',
      validate: notEmpty('name') // 验证
    },
    {
      type: 'checkbox',
      name: 'blocks',
      message: '请选择页面标签：',
      choices: [
        {
          name: '<template>',
          value: 'template',
          checked: true
        },
        {
          name: '<script>',
          value: 'script',
          checked: true
        },
        {
          name: '<style>',
          value: 'style',
          checked: true
        }
      ],
      validate(value) {
        if (
          value.indexOf('script') === -1 &&
          value.indexOf('template') === -1
        ) {
          return '组件最少需要一个 <script> 或 <template> 标签.';
        }
        return true;
      }
    }
  ],
  // 行为，具体执行的内容
  actions: (data) => {
    const name = '{{properCase name}}'; // 转换成每个单词的首字母大写
    const { path, blocks } = data;
    const actions = [
      {
        type: 'add',
        path: `src/components/${path}/${name}/index.vue`,
        templateFile: 'plop-templates/component/index.hbs',
        data: {
          name: name,
          template: blocks.includes('template'),
          script: blocks.includes('script'),
          style: blocks.includes('style')
        }
      },
      {
        type: 'add',
        path: `src/components/${path}/${name}/README.md`
      }
    ];
    return actions;
  }
};
