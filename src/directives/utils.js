const files = import.meta.globEager('./*.js');
const directives = [];

for (const key in files) {
  if (Object.hasOwnProperty.call(files, key)) {
    if (key.includes('./index.js')) continue;
    const directive = files[key].default;
    directives.push(directive);
  }
}

export default directives;
