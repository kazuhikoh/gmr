const Api = require('../datasource/remote/api.js')

function exec(config, articleNo, startNo, count) {
  (async () => {
    const api = new Api(config)
    
    try {
      const comments = await api.getComments(articleNo, startNo, count)

      for (let comment of comments) {
        console.log( JSON.stringify(comment, undefined, null) )
      }
    }
    catch (e) {
      console.error(e)
    }
  })()
}

module.exports = {
  exec
}
