const Api = require('../datasource/remote/api.js');

function exec(config, offset, size) {
  (async () => {
    const api = new Api(config);

    try {
      const feeds = await api.getOfficialFeeds(offset, size)
      for (let feed of feeds) {
        console.log( JSON.stringify(feed, undefined, null));
      }
    }
    catch (e) {
      console.error(e)
    }
  })()
}

module.exports = {
  exec 
};
