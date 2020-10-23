const Rx = require('rxjs/Rx');
const axios = require('axios');

class Api {
  constructor(config) {
    this.axios = axios.create({
      headers: {
        'Accept-Language': 'ja',
        'Cookie': config.cookieSession
      },
    });

    this.getOwnerFeedsUrl = config.getOwnerFeedsUrl;
  }
  
  getOwnerFeeds(arg1, arg2) {
    const url = this.getOwnerFeedsUrl
      .replace(/ 1 /, arg1)
      .replace(/ 2 /, arg2);
  
    return Rx.Observable
      .fromPromise(this.axios.get(url))
      .map(res => res.data)
      .flatMap(data => {
        return Rx.Observable.from(data.data.feed_list);
      });
  }
}

module.exports = Api;
