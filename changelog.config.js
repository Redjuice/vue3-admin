module.exports = {
  disableEmoji: false,
  format: '{type}{scope}: {emoji}{subject}',
  list: [
    'init',
    'feat',
    'ui',
    'fix',
    'perf',
    'refactor',
    'chore',
    'add',
    'del',
    'style',
    'docs',
    'test',
    'revert',
    'release',
    'deploy'
  ],
  maxMessageLength: 64,
  minMessageLength: 2,
  questions: [
    'type',
    // 'scope',
    'subject',
    'body'
    // 'breaking',
    // 'issues',
    // 'lerna'
  ],
  scopes: [],
  types: {
    init: {
      description: '初始提交',
      emoji: '🎉',
      value: 'init'
    },
    feat: {
      description: '增加新功能',
      emoji: '✨',
      value: 'feat'
    },
    ui: {
      description: '更新UI',
      emoji: '🌻',
      value: 'ui'
    },
    fix: {
      description: '修复bug',
      emoji: '🐛',
      value: 'fix'
    },
    perf: {
      description: '性能优化',
      emoji: '⚡️',
      value: 'perf'
    },
    refactor: {
      description: '代码重构',
      emoji: '♻️',
      value: 'refactor'
    },
    chore: {
      description: '更改配置文件',
      emoji: '🛠️',
      value: 'chore'
    },
    add: {
      description: '添加依赖',
      emoji: '➕',
      value: 'add'
    },
    del: {
      description: '删除代码/文件',
      emoji: '❌',
      value: 'del'
    },
    style: {
      description: '样式修改不影响逻辑',
      emoji: '🎨',
      value: 'style'
    },
    docs: {
      description: '修改文档',
      emoji: '📝',
      value: 'docs'
    },
    test: {
      description: '增加测试',
      emoji: '✅',
      value: 'test'
    },
    revert: {
      description: '版本回退',
      emoji: '⏪',
      value: 'revert'
    },
    release: {
      description: '发布',
      emoji: '⌨️',
      value: 'release'
    },
    deploy: {
      description: '部署',
      emoji: '👷',
      value: 'deploy'
    }
  }
};
