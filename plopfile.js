const componentGenerator = require('./plop-templates/component/prompt');

module.exports = (plop) => {
  plop.setGenerator('component', componentGenerator);
};
