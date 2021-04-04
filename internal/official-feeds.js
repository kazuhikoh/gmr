const Api = require('../datasource/remote/api.js');

function exec(config, offset, size) {
  (async () => {
    const api = new Api(config);

    try {
      const feeds = await api.getOfficialFeeds(offset, size)
      console.log( JSON.stringify(feeds, undefined, null));
    }
    catch (e) {
      console.error(e)
    }
  })()
}

module.exports = {
  exec 
};
