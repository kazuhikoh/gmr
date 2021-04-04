const Api = require('../datasource/remote/api.js');

function exec(config, albumContentsId, composedContentsId) {
  (async () => {
    const api = new Api(config);

    try {
      const tracks = await api.getMusicAlbumDetail(albumContentsId, composedContentsId)
      for (let track of tracks) {
        console.log( JSON.stringify(track, undefined, null) );
      }
    }
    catch (e) {
      console.error(e)
    }
  })()
}

function execPretty(config, albumContentsId, composedContentsId) {
   (async () => {
    const api = new Api(config);

    try {
      const tracks = await api.getMusicAlbumDetail(albumContentsId, composedContentsId)
      for (let track of tracks) {
        const url = await api.getDownloadURL(track.contents_id)
        console.log(`${url} ${track.title}`);
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
