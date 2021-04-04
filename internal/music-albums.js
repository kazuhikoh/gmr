const Api = require('../datasource/remote/api.js');

function exec(config, pageNo, pageSize) {
  (async () => {
    const api = new Api(config);

    try {
      const albums = await api.getMusicAlbums(pageNo, pageSize)
      console.log( JSON.stringify(albums, undefined, null));
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
      const albums = await api.getMusicAlbums(pageNo, pageSize)
      for (let album of albums) {
        console.log(`${album.contents_id} ${album.composed_contents_id} ${album.title}`);
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
