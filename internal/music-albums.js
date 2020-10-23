const Api = require('../datasource/remote/api.js');

function exec(config, pageNo, pageSize) {
  const api = new Api(config);

  api.getMusicAlbums(pageNo, pageSize).subscribe(album => {
    console.log(
      JSON.stringify(album, undefined, null)
    );
  });
}

function execPretty(config, pageNo, pageSize) {
  const api = new Api(config);

  api.getMusicAlbums(pageNo, pageSize).subscribe(album => {
    console.log(`${album.contents_id} ${album.composed_contents_id} ${album.title}`);
  });
}

module.exports = {
  exec,
  execPretty,
};
