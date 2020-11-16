const dayjs = require('dayjs');

const Api = require('../datasource/remote/api.js');

function exec(config, membershipNo, pageNo, pageSize) {
  const api = new Api(config);

  api.getFeeds(membershipNo, pageNo, pageSize).subscribe(feed => {
    console.log(
      JSON.stringify(feed, undefined, null)
    );
  });
}

function execPretty(config, membershipNo, pageNo, pageSize) {
  const api = new Api(config);

  api.getFeeds(membershipNo, pageNo, pageSize).subscribe(feed => {
    const utcDate = dayjs.utc(feed.article_date, 'YYYY/MM/DD HH:mm');
    
    console.log(
      `${feed.article_no} ${utcDate.toJSON()} ${feed.iine_count} ${feed.comment_count} ${feed.nickname} ${feed.body_text.replace(/\n/g, '')}`
    );
  });
}

module.exports = {
  exec, 
  execPretty
};
