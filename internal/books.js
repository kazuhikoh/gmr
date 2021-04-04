const Api = require('../datasource/remote/api.js');

function exec(config, pageNo, pageSize) {
  (async () => {
    const api = new Api(config);

    try {
      const books = await api.getBooks(pageNo, pageSize)
      for (let book of books) {
        console.log( JSON.stringify(book, undefined, null));
      }
    }
    catch (e) {
      console.error(e)
    }
  })()
}

function execPretty(config, pageNo, pageSize) {
  (async () => {
    const api = new Api(config);

    try {
      const books = await api.getBooks(pageNo, pageSize)
      for (let book of books) {
        console.log(`${book.contents_id} ${book.products_nm}`);
      }
    }
    catch (e) {
      console.error(e)
    }
  })()
}

module.exports = {
  exec,
  execPretty,
};
