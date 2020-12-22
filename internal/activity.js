const dayjs = require('dayjs');

const Api = require('../datasource/remote/api.js');

function exec(config, membershipNo, pageNo, pageSize, option) {
  const api = new Api(config);

  api.getMypageActivity(membershipNo, pageNo, pageSize).subscribe(log => {
    if (option.localtime) {
      const utcDate = dayjs.utc(feed.article_date, 'YYYY/MM/DD HH:mm');
      feed.article_date = utcDate.local().format();
    }

    if (option.pretty) {
      console.log(`${log.activity_date} ${log.text}`);
    }
    else {
      console.log( JSON.stringify(log, undefined, null) );
    }
  });
}

module.exports = {
  exec 
};
