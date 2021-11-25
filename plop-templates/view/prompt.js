const { notEmpty } = require('../utils.js')

module.exports = {
  description: '创建 view',
  prompts: [
    {
      type: 'input',
      name: 'ename',
      message: '请输入文件路径:',
      validate: notEmpty('ename')
    },
    {
      type: 'input',
      name: 'cname',
      message: '请输入菜单名称（页面标题）中文:',
      validate: notEmpty('cname')
    },
    {
      type: 'list',
      name: 'temp',
      message: '请选择页面模板',
      choices: [
        { name: 'menu', value: 'menu' },
        { name: 'list', value: 'list' },
        { name: 'form', value: 'form' }
      ]
    },
    {
      type: 'checkbox',
      name: 'listBlock',
      message: '请选择页面模块组成：',
      choices: [
        {
          name: '#header',
          value: 'header',
          checked: true
        },
        {
          name: '#search',
          value: 'search',
          checked: true
        },
        {
          name: '#tabs',
          value: 'tabs',
          checked: true
        },
        {
          name: '#paging',
          value: 'paging',
          checked: true
        }
      ],
      when: data => {
        return data.temp === 'list'
      }
    },
    {
      type: 'checkbox',
      name: 'formBlock',
      message: '请选择页面模块组成：',
      choices: [
        {
          name: '#input',
          value: 'input',
          checked: true
        },
        {
          name: '#select',
          value: 'select',
          checked: true
        },
        {
          name: '#upload',
          value: 'upload',
          checked: true
        },
        {
          name: '#footer',
          value: 'footer',
          checked: true
        }
      ],
      when: data => {
        return data.temp === 'form'
      }
    },
    {
      type: 'checkbox',
      name: 'blocks',
      message: '请选择标签',
      choices: [
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
      ]
      // validate(value) {
      //   if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
      //     return 'View require at least a <script> or <template> tag.';
      //   }
      //   return true;
      // }
    }
  ],
  actions: data => {
    data.path = data.ename
    data.ename = data.ename.split('/').splice(-1)[0]
    data.template = true
    data.hide = false
    // data.script = data.blocks.includes('script');
    // data.style = data.blocks.includes('style');
    data.blocks.forEach(item => {
      data[item] = true
    })
    data.listBlock &&
      data.listBlock.forEach(item => {
        data[item] = true
      })
    data.formBlock &&
      data.formBlock.forEach(item => {
        data[item] = true
      })
    // if (data.type === 1) {
    //   data.temp = 'default';
    // }
    console.log(data)
    // const pname = '{{ pathCase path }}';
    // const ename = '{{ lowerCase ename}}';
    const pname = '{{ path }}'
    const ename = '{{ ename}}'
    const temp = '{{ lowerCase temp}}'
    const actions = [
      {
        type: 'add',
        path: `src/views/myapp/${pname}/${ename}.vue`,
        templateFile: `plop-template/view/index.${temp}.hbs`,
        data: data
      },
      {
        type: 'add',
        path: `src/views/myapp/${pname}/${ename}.js`,
        templateFile: 'plop-template/view/index.js.hbs',
        data: data
      }
    ]

    return actions
  }
}
