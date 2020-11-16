const dayjs = require('dayjs');

const Api = require('../datasource/remote/api.js');

function exec(config, membershipNo, pageNo, pageSize, option) {
  const api = new Api(config);

  api.getFeeds(membershipNo, pageNo, pageSize).subscribe(feed => {
    if (option.localtime) {
      const utcDate = dayjs.utc(feed.article_date, 'YYYY/MM/DD HH:mm');
      feed.article_date = utcDate.local().format();
    }

    if (option.pretty) {
      console.log(
        `${feed.article_no} ${feed.article_date} ${feed.iine_count} ${feed.comment_count} ${feed.nickname} ${feed.body_text.replace(/\n/g, '')}`
      );
    }
    else {
      console.log( JSON.stringify(feed, undefined, null) );
    }
  });
}

module.exports = {
  exec 
};
