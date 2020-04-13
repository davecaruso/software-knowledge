const path = require('path');
const { randomOf } = require('@reverse/random');
const fs = require('fs-extra');

function fromEntries (iterable) {
  return [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val
    return obj
  }, {})
}

const allArticles = {};
const allEnds = {};
const allCategories = {};

async function read(dir) {
  const files = await fs.readdir(path.join(__dirname, dir));
  await Promise.all(files.map(async(file) => {
    const stats = await fs.stat(path.join(__dirname, dir, file));
    if(stats.isDirectory() && !file.startsWith('.') && !file.includes('node_modules')) {
      await read(path.join(dir, file));
    } else {
      if (file.toLowerCase().endsWith('.md') && file.toLowerCase() !== 'readme.md') {
        const contents = (await fs.readFile(path.join(__dirname, dir, file))).toString();
        const match = contents.match(/\s*?(?:(?:^|\n)\s*---\s*\n((?:.|\n)*)?\n\s*---)?((?:.|\n)*)/);
        if (!match) {
          throw new Error("Cannot parse " + path.join(dir, file));
        }
        const metaString = match[1] && match[1].replace(/^\s+|\s+$/g, '');
        const meta = metaString ? fromEntries(metaString
          .split('\n')
          .map(x => x.match(/([^:]*):(.*)/))
          .filter(x => x && x[1].length > 0)
          .map(x => [x[1].trim(), x[2].trim()])) : {};
        const content = match[2].replace(/^\s+|\s+$/g, '');

        const id = path.posix.join('/', dir, file.replace('.md', '')).substr(1);

        const entry = {
          id: id,
          ...meta,
          title: meta.title || id,
          created: meta.created || null,
          author: meta.author || null,
          alias: (meta.alias || '').split(',').map(x => x.trim()).filter(x => x.length > 0),
          content
        }
        allArticles[id] = entry;

        const categories = id.split('/');
        const end = categories.pop();
        allCategories['*'] = (allCategories['*'] || []).concat(id);
        categories.forEach(category => {
          allCategories[category] = (allCategories[category] || []).concat(id);
        });
        allEnds[end] = (allEnds[end] || []).concat(id);
        entry.alias.forEach(alias => {
          allEnds[alias] = (allEnds[alias] || []).concat(id);
        });
      }
    }
  }));
}
async function load(...categories) {
  if(categories.length === 0) {
    await read('/')
  } else {
    await Promise.all(categories.map(read));
  }
}
async function getData() {
  return {
    articles: allArticles,
    ends: allEnds,
    categories: allCategories,
  };
}
function filterArticles(filter, array) {
  return filter ? array.filter(x => x.replace(/\/\w*?$/g, '').includes(filter)) : array;
}
async function searchForArticle(query) {
  if (!query) {
    query = '*';
  }
  const split = query.split(/\s*\/\s*|\s+/);
  const search = split.pop();
  const filter = split.join('/');

  if (search in allEnds) {
    const ids = filterArticles(filter, allEnds[search])
    if (ids.length === 1) {
      return allArticles[ids[0]];
    } else {
      return ids.map(x => allArticles[x]);
    }
  } else {
    if (search in allCategories) {
      return allArticles[randomOf(filterArticles(filter, allCategories[search]))];
    } else {
      return null;
    }
  }
}

if (require.main === module) {
  const cli = require('cli');
  const options = cli.parse({ load: [ '-l', 'load folder', 'string', '' ] });
  
  const toBeLoaded = options.load.split(',').filter(x => x.length > 0);
  const command = cli.args[0];

  if (command === 'search') {
    load(...toBeLoaded).then(async() => {
      console.log(JSON.stringify(await searchForArticle(cli.args[1])));
    })
  } else if (command === 'dump') {
    load(...toBeLoaded).then(async() => {
      console.log(JSON.stringify(await getData()));
    })
  } else {
    console.log('knowledge database cli tool thingy (KDCTT)');
    console.log('');
    console.log('by default everything is loaded, to only load a subsection');
    console.log('use the "--load folder1,folder2,etc" argument');
    console.log('');
    console.log('commands:');
    console.log('  ' + path.basename(process.argv[1]) + ' dump');
    console.log('  ' + path.basename(process.argv[1]) + ' search "<query>"');
  }
} else {
  module.exports = {
    load,
    getData,
    searchForArticle
  }
}
