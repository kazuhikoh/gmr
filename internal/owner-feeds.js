const dayjs = require('dayjs');

const Api = require('../datasource/remote/api.js');

function exec(config, pageNo, pageSize, option) {
  const api = new Api(config);

  api.getOwnerFeeds(pageNo, pageSize).subscribe(feed => {
    if (option.localtime) {
      const utcDate = dayjs.utc(feed.article_date, 'YYYY/MM/DD HH:mm');
      feed.article_date = utcDate.local().format();
    }

    console.log(
      JSON.stringify(feed, undefined, null)
    );
  });
}

module.exports = {
  exec 
};
