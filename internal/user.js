const Api = require('../datasource/remote/api.js');

function exec(config, membershipNo) {
  const api = new Api(config);
  
  api.getUser(membershipNo).subscribe(user => {
    console.log( JSON.stringify(user, undefined, null) );
  });
}

module.exports = {
  exec
};
