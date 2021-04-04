const Api = require('../datasource/remote/api.js');

function exec(config, membershipNo) {
  (async () => {
    const api = new Api(config)

    try {
      const user = await api.getUser(membershipNo)
      console.log( JSON.stringify(user, undefined, null) )
    }
    catch (e) {
      console.error(e)
    }
  })()
}

module.exports = {
  exec
};
