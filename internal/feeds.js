const dayjs = require('dayjs');

const Api = require('../datasource/remote/api.js');

function exec(config, membershipNo, pageNo, pageSize, option) {
  (async () => {
    const api = new Api(config);

    try {
      const feeds = await api.getFeeds(membershipNo, pageNo, pageSize)
      
      if (option.localtime) {
        for (let feed of feeds) {
          const utcDate = dayjs.utc(feed.article_date, 'YYYY/MM/DD HH:mm');
          feed.article_date = utcDate.local().format();
        }
      }

      for (let feed of feeds) {
        if (option.pretty) {
          console.log(
            `${feed.article_no} ${feed.article_date} ${feed.iine_count} ${feed.comment_count} ${feed.nickname} ${feed.body_text.replace(/\n/g, '')}`
          );
        }
        else {
          console.log( JSON.stringify(feed, undefined, null) );
        }
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
