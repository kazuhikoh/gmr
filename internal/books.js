const Api = require('../datasource/remote/api.js');

function exec(config, pageNo, pageSize) {
  const api = new Api(config);

  api.getBooks(pageNo, pageSize).subscribe(book => {
    console.log(
      JSON.stringify(book, undefined, null)
    );
  });
}

function execPretty(config, pageNo, pageSize) {
  const api = new Api(config);

  api.getBooks(pageNo, pageSize).subscribe(book => {
    console.log(`${book.contents_id} ${book.products_nm}`);
  });
}

module.exports = {
  exec,
  execPretty,
};
