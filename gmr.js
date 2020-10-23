#!/usr/bin/env node

const app = require('commander');
const os = require('os');

const configLoader = require('./datasource/local/config-loader.js');
const cmdOwnerFeeds = require('./internal/owner-feeds.js');

app
  .version('3.0.21');

app
  .command('owner-feed <pageNo> <pageSize>')
  .action((pageNo, pageSize) => {
    const config = configLoader.load(`${os.homedir()}/.gmr-config.json`);
    cmdOwnerFeeds.exec(config, pageNo, pageSize);
  });

app
  .command('config')
  .action(() => {
    const config = configLoader.createConfig();
    console.log(JSON.stringify(config, undefined, ''));
  });
app.parse(process.argv);
