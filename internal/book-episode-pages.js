const Api = require('../datasource/remote/api.js')

function exec(config, bookContentsId, episodeContentsId, bookStoryResId) {
  (async () => {
    const api = new Api(config);

    try {
      const pages = await api.getBookEpisodePages(bookContentsId, episodeContentsId, encodeURI(bookStoryResId))
      for (let page of pages) {
        console.log( JSON.stringify(page, undefined, null));
      }
    }
    catch (e) {
      console.error(e)
    }
  })()
}

function execPretty(config, bookContentsId, episodeContentsId, bookStoryResId) {
  (async () => {
    const api = new Api(config);

    try {
      const pages = await api.getBookEpisodePages(bookContentsId, episodeContentsId, encodeURI(bookStoryResId))
      for (let page of pages) {
        console.log(`${page.book_res_image_url} ${page.page_no}`)
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
