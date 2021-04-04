const Api = require('../datasource/remote/api.js');

function exec(config, membershipNo) {
  const api = new Api(config);
  
  api.getUser(membershipNo).subscribe(
    user => {
      console.log( JSON.stringify(user, undefined, null) );
    },
    error => {
      console.error(error.message);
    }
  );
}

module.exports = {
  exec
};
