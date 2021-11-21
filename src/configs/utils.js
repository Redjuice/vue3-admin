// @ts-nocheck
// 获取baseurl
const getBaseUrL = () => {
  let api;
  // typeof可以用来检查一个没有声明的变量，而不报错。
  // http://javascript.ruanyifeng.com/grammar/types.html#toc1
  if (
    typeof window != 'undefined' &&
    window.location.hostname === 'localhost'
  ) {
    api = `${import.meta.env.VITE_APP_AXIOS_BASE_URL}`;
  } else {
    api =
      import.meta.env &&
      `${import.meta.env.VITE_API_ROOT}${
        import.meta.env.VITE_APP_AXIOS_BASE_URL
      }`;
  }
  return api;
};

export { getBaseUrL };
