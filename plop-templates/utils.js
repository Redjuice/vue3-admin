// 输入不能为空验证
exports.notEmpty = (name) => (v) =>
  !v || v.trim() === '' ? `${name} is required` : true;
