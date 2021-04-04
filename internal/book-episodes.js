const Api = require('../datasource/remote/api.js');

function exec(config, bookContentsId) {
  (async () => {
    const api = new Api(config);

    try {
      const episodes = await api.getBookEpisodes(bookContentsId)
      console.log(
        JSON.stringify(episodes, undefined, null)
      );
    }
    catch (e) {
      console.error(e)
    }
  })()
}

function execPretty(config, bookContentsId) {
  (async () => {
    const api = new Api(config);

    try {
      const episodes = await api.getBookEpisodes(bookContentsId)
      for (let episode of episodes) {
        console.log(`${bookContentsId} ${episode.contents_id} ${episode.book_story_resid} ${episode.title}`);
      }
    }
    catch (e) {
      console.error(e)
    }
  })()
}

function execDeep(config, bookContentsId) {
  (async () => {
    const api = new Api(config);

    try {
      const episodes = await api.getBookEpisodes(bookContentsId)
      for (let episode of episodes) {
        const pages = await api.getBookEpisodePages(bookContentsId, episode.contents_id, encodeURI(episode.book_story_resid))
        for (let page of pages) {
          console.log(`${episode.contents_id} ${page.page_no} ${page.book_res_image_url}`);
        }
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
  execDeep,
};
