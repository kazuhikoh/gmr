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

    this.getOwnerFeedsUrl = config.urlGetOwnerFeeds;

    this.getMusicAlbumsUrl = config.urlGetMusicAlbums;
    this.getMusicAlbumDetailUrl = config.urlGetMusicAlbumDetail;
    this.getDownloadURLUrl = config.urlGetDownloadURL;

    this.urlGetBooks = config.urlGetBooks;
    this.urlGetBookEpisodes = config.urlGetBookEpisodes;
    this.urlGetBookEpisodePages = config.urlGetBookEpisodePages;
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

  getMusicAlbums(arg1, arg2) {
    const url = this.getMusicAlbumsUrl
      .replace(/ 1 /, arg1)
      .replace(/ 2 /, arg2);

    return Rx.Observable
      .fromPromise(this.axios.get(url))
      .map(res => res.data)
      .flatMap(it => {
        return Rx.Observable.from(it.data.music_album_list_info);
      });
  }

  getMusicAlbumDetail(arg1, arg2) {
    const url = this.getMusicAlbumDetailUrl
      .replace(/ 1 /, arg1)
      .replace(/ 2 /, arg2);

    return Rx.Observable
      .fromPromise(this.axios.get(url))
      .map(res => res.data)
      .flatMap(it => {
        return Rx.Observable.from(it.data.album_detail_info.track_info);
      });
  }

  getDownloadURL(arg1) {
    const url = this.getDownloadURLUrl
      .replace(/ 1 /, arg1);

    return Rx.Observable
      .fromPromise(this.axios.get(url))
      .map(res => res.data)
      .flatMap(it => {
        return Rx.Observable.of(it.data.url);
      });
  }

  getBooks(arg1, arg2) {
    const url = this.urlGetBooks
      .replace(/ 1 /, arg1)
      .replace(/ 2 /, arg2);

    return Rx.Observable
      .fromPromise(this.axios.get(url))
      .map(res => res.data)
      .flatMap(it => {
        return Rx.Observable.from(it.data.book_info);
      });
  }

  getBookEpisodes(arg1) {
    const url = this.urlGetBookEpisodes
      .replace(/ 1 /, arg1);

    return Rx.Observable
      .fromPromise(this.axios.get(url))
      .map(res => res.data)
      .flatMap(it => {
        return Rx.Observable.from(it.data.book_episode_list_info);
      });
  }

  getBookEpisodePages(arg1, arg2, arg3) {
    const url = this.urlGetBookEpisodePages
      .replace(/ 1 /, arg1)
      .replace(/ 2 /, arg2)
      .replace(/ 3 /, arg3);

    return Rx.Observable
      .fromPromise(this.axios.get(url))
      .map(res => res.data)
      .flatMap(it => {
        return Rx.Observable.from(it.data.book_res_info);
      });
  }


}

module.exports = Api;
