const Api = require('../datasource/remote/api.js');

function exec(config, bookContentsId, episodeContentsId, bookStoryResId) {
  const api = new Api(config);

  api.getBookEpisodePages(bookContentsId, episodeContentsId, encodeURI(bookStoryResId)).subscribe(
    page => {
      console.log(
        JSON.stringify(page, undefined, null)
      );
    },
    error => {
      console.error(error.message);
    }
  );
}

function execPretty(config, bookContentsId, episodeContentsId, bookStoryResId) {
  const api = new Api(config);

  api.getBookEpisodePages(bookContentsId, episodeContentsId, encodeURI(bookStoryResId)).subscribe(page => {
    console.log(`${page.book_res_image_url} ${page.page_no}`);
  });
}

module.exports = {
  exec,
  execPretty,
};
