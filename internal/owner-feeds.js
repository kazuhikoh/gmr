const Api = require('../datasource/remote/api.js');

function exec(config, pageNo, pageSize) {
  const api = new Api(config);

  api.getOwnerFeeds(pageNo, pageSize).subscribe(feed => {
    console.log(
      JSON.stringify(feed, undefined, null)
    );
  });
}

module.exports = {
  exec 
};
