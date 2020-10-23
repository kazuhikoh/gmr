#!/usr/bin/env node

const app = require('commander');
const os = require('os');

const configLoader = require('./datasource/local/config-loader.js');

const cmdOwnerFeeds = require('./internal/owner-feeds.js');
const cmdMusicAlbums = require('./internal/music-albums.js');
const cmdMusicAlbum = require('./internal/music-album.js');

app
  .version('3.0.21');

app
  .command('owner-feeds <pageNo> <pageSize>')
  .action((pageNo, pageSize) => {
    const config = configLoader.load(`${os.homedir()}/.gmr-config.json`);
    cmdOwnerFeeds.exec(config, pageNo, pageSize);
  });

app
  .command('music-albums <pageNo> <pageSize>')
  .option('-p, --pretty', 'pretty print')
  .action((pageNo, pageSize, cmd) => {
    const config = configLoader.load(`${os.homedir()}/.gmr-config.json`);

    if (cmd.pretty) {
      cmdMusicAlbums.execPretty(config, pageNo, pageSize);
    }
    else {
      cmdMusicAlbums.exec(config, pageNo, pageSize);
    }
  });

app
  .command('music-album <albumContentsId> <composedContentsId>')
  .option('-p, --pretty', 'pretty print')
  .action((albumContentsId, composedContentsId, cmd) => {
    const config = configLoader.load(`${os.homedir()}/.gmr-config.json`);

    if (cmd.pretty) {
      cmdMusicAlbum.execPretty(config, albumContentsId, composedContentsId);
    }
    else {
      cmdMusicAlbum.exec(config, albumContentsId, composedContentsId);
    }
  });

app
  .command('config')
  .action(() => {
    const config = configLoader.createConfig();
    console.log(JSON.stringify(config, undefined, ''));
  });
app.parse(process.argv);
