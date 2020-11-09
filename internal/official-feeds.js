const Api = require('../datasource/remote/api.js');

function exec(config, offset, size) {
  const api = new Api(config);

  api.getOfficialFeeds(offset, size).subscribe(feed => {
    console.log(
      JSON.stringify(feed, undefined, null)
    );
  });
}

module.exports = {
  exec 
};
