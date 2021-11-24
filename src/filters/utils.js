const files = import.meta.globEager('./*.js');
const filters = [];

for (const key in files) {
  if (Object.hasOwnProperty.call(files, key)) {
    if (key.includes('./index.js')) continue;
    const filter = files[key].default;
    filters.push(filter);
  }
}

export default filters;
