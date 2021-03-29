const Api = require('../datasource/remote/api.js');

function exec(config, albumContentsId, composedContentsId) {
  const api = new Api(config);

  api.getMusicAlbumDetail(albumContentsId, composedContentsId).subscribe(
    track => {
      console.log( JSON.stringify(track, undefined, null) );
    },
    error => { console.error('empty'); },
    () => {}
  );
}

function execPretty(config, albumContentsId, composedContentsId) {
  const api = new Api(config);

  api.getMusicAlbumDetail(albumContentsId, composedContentsId).subscribe(
    track => {
      api.getDownloadURL(track.contents_id).subscribe( url => {
        console.log(`${url} ${track.title}`);
      });
    },
    error => { console.error('empty'); },
    () => {}
  );
}

module.exports = {
  exec,
  execPretty,
};
