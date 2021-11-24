import directives from './utils';

export default {
  install: (app) => {
    if (!directives.length) return;
    directives.forEach((item) => {
      app.directive(item.name, item.hooks);
    });
  }
};
