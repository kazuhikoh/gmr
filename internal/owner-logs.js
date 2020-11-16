const dayjs = require('dayjs');

const Api = require('../datasource/remote/api.js');

function exec(config, pageNo, pageSize) {
  const api = new Api(config);

  api.getOwnerMypageActivityLogs(pageNo, pageSize).subscribe(log => {
    console.log(
      JSON.stringify(log, undefined, null)
    );
  });
}

function execPretty(config, pageNo, pageSize) {
  const api = new Api(config);

  api.getOwnerMypageActivityLogs(pageNo, pageSize).subscribe(log => {
    const utcDate = dayjs.utc(log.activity_date, 'YYYY/MM/DD HH:mm');

    console.log(`${utcDate.local().format()} ${log.text}`);
  });
}


module.exports = {
  exec,
  execPretty,
};
