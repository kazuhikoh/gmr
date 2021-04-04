const Api = require('../datasource/remote/api.js');

function exec(config, bookContentsId) {
  const api = new Api(config);

  api.getBookEpisodes(bookContentsId).subscribe(
    episode => {
      console.log(
        JSON.stringify(episode, undefined, null)
      );
    },
    error => {
      console.error(error.message);
    }
  );
}

function execPretty(config, bookContentsId) {
  const api = new Api(config);

  api.getBookEpisodes(bookContentsId).subscribe(episode => {
    console.log(`${bookContentsId} ${episode.contents_id} ${episode.book_story_resid} ${episode.title}`);
  });
}

function execDeep(config, bookContentsId) {
  const api = new Api(config);

  api.getBookEpisodes(bookContentsId).subscribe(episode => {
    api.getBookEpisodePages(bookContentsId, episode.contents_id, encodeURI(episode.book_story_resid)).subscribe(page => {
      console.log(`${episode.contents_id} ${page.page_no} ${page.book_res_image_url}`);
    });
  });
}

module.exports = {
  exec,
  execPretty,
  execDeep,
};
