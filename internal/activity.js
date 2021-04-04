const dayjs = require('dayjs');

const Api = require('../datasource/remote/api.js');

function exec(config, membershipNo, pageNo, pageSize, option) {
  (async () => {
    const api = new Api(config);

    try {
      const logs = await api.getMypageActivity(membershipNo, pageNo, pageSize)

      if (option.localtime) {
        for (let log of logs) {
          const utcDate = dayjs.utc(log.activity_date, 'YYYY/MM/DD HH:mm');
          log.activity_date = utcDate.local().format();
        }
      }

      if (option.pretty) {
        for (let log of logs) {
          console.log(`${log.activity_date} ${log.text}`);
        }
        return 
      }

      console.log( JSON.stringify(logs, undefined, null) );
    }
    catch (e) {
      console.error(e)
    }
  })()
}

module.exports = {
  exec 
};
