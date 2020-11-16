#!/usr/bin/env node

const app = require('commander');
const os = require('os');

const dayjs = require('dayjs');
dayjs.extend(require('dayjs/plugin/utc'));
dayjs.extend(require('dayjs/plugin/timezone'));
dayjs.extend(require('dayjs/plugin/customParseFormat'));

const configLoader = require('./datasource/local/config-loader.js');

const cmdFeeds = require('./internal/feeds.js');

const cmdOwnerFeeds = require('./internal/owner-feeds.js');
const cmdOwnerLogs = require('./internal/owner-logs.js');

const cmdOfficialFeeds = require('./internal/official-feeds.js');

const cmdMusicAlbums = require('./internal/music-albums.js');
const cmdMusicAlbum = require('./internal/music-album.js');

const cmdBooks = require('./internal/books.js');
const cmdBookEpisodes = require('./internal/book-episodes.js');
const cmdBookEpisodePages = require('./internal/book-episode-pages.js');

app
  .version('1.3.0');

app
  .command('feeds <membershipNo> <pageNo> <pageSize>')
  .option('-p, --pretty', 'pretty print')
  .action((membershipNo, pageNo, pageSize, cmd) => {
    const config = configLoader.load(`${os.homedir()}/.gmr-config.json`);

    if (cmd.pretty) {
      cmdFeeds.execPretty(config, membershipNo, pageNo, pageSize);
    }
    else {
      cmdFeeds.exec(config, membershipNo, pageNo, pageSize);
    }
  });

app
  .command('owner-feeds <pageNo> <pageSize>')
  .action((pageNo, pageSize) => {
    const config = configLoader.load(`${os.homedir()}/.gmr-config.json`);
    cmdOwnerFeeds.exec(config, pageNo, pageSize);
  });

app
  .command('owner-logs <pageNo> <pageSize>')
  .option('-p, --pretty', 'pretty print')
  .action((pageNo, pageSize, cmd) => {
    const config = configLoader.load(`${os.homedir()}/.gmr-config.json`);

    if (cmd.pretty) {
      cmdOwnerLogs.execPretty(config, pageNo, pageSize);
    }
    else {
      cmdOwnerLogs.exec(config, pageNo, pageSize);
    }
  });

app
  .command('official-feeds <offset> <size>')
  .action((offset, size) => {
    const config = configLoader.load(`${os.homedir()}/.gmr-config.json`);
    cmdOfficialFeeds.exec(config, offset, size);
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
  .command('books <pageNo> <pageSize>')
  .option('-p, --pretty', 'pretty print')
  .action((pageNo, pageSize, cmd) => {
    const config = configLoader.load(`${os.homedir()}/.gmr-config.json`);

    if (cmd.pretty) {
      cmdBooks.execPretty(config, pageNo, pageSize);
    }
    else {
      cmdBooks.exec(config, pageNo, pageSize);
    }
  });

app
  .command('book-episodes <bookId>')
  .option('-p, --pretty', 'pretty print')
  .option('-d, --deep', 'print image url')
  .action((bookId, cmd) => {
    const config = configLoader.load(`${os.homedir()}/.gmr-config.json`);

    if (cmd.pretty) {
      cmdBookEpisodes.execPretty(config, bookId);
    }
    else if (cmd.deep) {
      cmdBookEpisodes.execDeep(config, bookId);
    }
    else {
      cmdBookEpisodes.exec(config, bookId);
    }
  });

app
  .command('book-episode-pages <bookId> <episodeId> <bookStoryResId>')
  .option('-p, --pretty', 'pretty print')
  .action((bookId, episodeId, bookStoryResId, cmd) => {
    const config = configLoader.load(`${os.homedir()}/.gmr-config.json`);

    if (cmd.pretty) {
      cmdBookEpisodePages.execPretty(config, bookId, episodeId, bookStoryResId);
    }
    else {
      cmdBookEpisodePages.exec(config, bookId, episodeId, bookStoryResId);
    }
  });

app
  .command('config')
  .action(() => {
    const config = configLoader.createConfig();
    console.log(JSON.stringify(config, undefined, ''));
  });
app.parse(process.argv);
