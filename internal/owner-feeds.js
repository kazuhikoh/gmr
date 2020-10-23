const Api = require('../datasource/remote/api.js');

function exec(config, pageNo, pageSize) {
  const api = new Api(config);

  api.getOwnerFeeds(pageNo, pageSize).subscribe(feeds => {
    console.log(
      JSON.stringify(feeds, undefined, null)
    );
  });
}

module.exports = {
  exec 
};
