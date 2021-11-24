import filtersGather from './utils';
const filters = filtersGather.flat();

export default {
  install: (app) => {
    if (!filters.length) return;
    if (!app.config.globalProperties.$filters)
      app.config.globalProperties.$filters = {};
    filters.forEach((item) => {
      app.config.globalProperties.$filters[item.name] = item.func;
    });
  }
};
