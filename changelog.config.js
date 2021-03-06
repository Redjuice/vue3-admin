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
      description: 'åå§æäº¤',
      emoji: 'ð',
      value: 'init'
    },
    feat: {
      description: 'å¢å æ°åè½',
      emoji: 'â¨',
      value: 'feat'
    },
    ui: {
      description: 'æ´æ°UI',
      emoji: 'ð»',
      value: 'ui'
    },
    fix: {
      description: 'ä¿®å¤bug',
      emoji: 'ð',
      value: 'fix'
    },
    perf: {
      description: 'æ§è½ä¼å',
      emoji: 'â¡ï¸',
      value: 'perf'
    },
    refactor: {
      description: 'ä»£ç éæ',
      emoji: 'â»ï¸',
      value: 'refactor'
    },
    chore: {
      description: 'æ´æ¹éç½®æä»¶',
      emoji: 'ð ï¸',
      value: 'chore'
    },
    add: {
      description: 'æ·»å ä¾èµ',
      emoji: 'â',
      value: 'add'
    },
    del: {
      description: 'å é¤ä»£ç /æä»¶',
      emoji: 'â',
      value: 'del'
    },
    style: {
      description: 'æ ·å¼ä¿®æ¹ä¸å½±åé»è¾',
      emoji: 'ð¨',
      value: 'style'
    },
    docs: {
      description: 'ä¿®æ¹ææ¡£',
      emoji: 'ð',
      value: 'docs'
    },
    test: {
      description: 'å¢å æµè¯',
      emoji: 'â',
      value: 'test'
    },
    revert: {
      description: 'çæ¬åé',
      emoji: 'âª',
      value: 'revert'
    },
    release: {
      description: 'åå¸',
      emoji: 'â¨ï¸',
      value: 'release'
    },
    deploy: {
      description: 'é¨ç½²',
      emoji: 'ð·',
      value: 'deploy'
    }
  }
};
