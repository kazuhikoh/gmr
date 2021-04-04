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

    this.urlGetFeeds = config.urlGetFeeds;
    this.urlGetMypageActivity = config.urlGetMypageActivity;

    this.urlGetOfficialFeeds = config.urlGetOfficialFeeds;

    this.urlGetMusicAlbums = config.urlGetMusicAlbums;
    this.urlGetMusicAlbumDetail = config.urlGetMusicAlbumDetail;
    this.urlGetDownloadURL = config.urlGetDownloadURL;

    this.urlGetBooks = config.urlGetBooks;
    this.urlGetBookEpisodes = config.urlGetBookEpisodes;
    this.urlGetBookEpisodePages = config.urlGetBookEpisodePages;
    
    this.urlGetUser = config.urlGetUser;
  }

  getData(url) {
    return Rx.Observable
      .fromPromise(this.axios.get(url))
      .flatMap(res => {
        if (!res.data || !res.data.head || !res.data.head.resultCode || !res.data.head.resultCode.match(/^SS.*/g)) {
          const json = JSON.stringify(res.data, undefined, null);
          return Rx.Observable.throw(new Error(json))
        } 

        return Rx.Observable.of(res.data)
      })
  }

  getFeeds(arg1, arg2, arg3) {
    const url = this.urlGetFeeds
      .replace(/ 1 /, arg1)
      .replace(/ 2 /, arg2)
      .replace(/ 3 /, arg3);
  
    return this.getData(url)
      .flatMap(data => {
        console.log(JSON.stringify(data, undefined, null))
        return Rx.Observable.from(data.data.feed_list);
      });
  }

  getMypageActivity(arg1, arg2, arg3) {
    const url = this.urlGetMypageActivity
      .replace(/ 1 /, arg1)
      .replace(/ 2 /, arg2)
      .replace(/ 3 /, arg3);
  
    return this.getData(url)
      .flatMap(data => {
        return Rx.Observable.from(data.data.activity_list);
      });
  }

  getOfficialFeeds(arg1, arg2) {
    const url = this.urlGetOfficialFeeds
      .replace(/ 1 /, arg1)
      .replace(/ 2 /, arg2);
  
    return this.getData(url)
      .flatMap(data => {
        return Rx.Observable.from(data.data.fanfeed_list_info);
      });
  }

  getMusicAlbums(arg1, arg2) {
    const url = this.urlGetMusicAlbums
      .replace(/ 1 /, arg1)
      .replace(/ 2 /, arg2);

    return this.getData(url)
      .flatMap(it => {
        return Rx.Observable.from(it.data.music_album_list_info);
      });
  }

  getMusicAlbumDetail(arg1, arg2) {
    const url = this.urlGetMusicAlbumDetail
      .replace(/ 1 /, arg1)
      .replace(/ 2 /, arg2);

    return this.getData(url)
      .flatMap(it => {
        return Rx.Observable.from(it.album_detail_info.track_info);
      });
  }

  getDownloadURL(arg1) {
    const url = this.urlGetDownloadURL
      .replace(/ 1 /, arg1);

    return this.getData(url)
      .flatMap(it => {
        return Rx.Observable.of(it.data.url);
      });
  }

  getBooks(arg1, arg2) {
    const url = this.urlGetBooks
      .replace(/ 1 /, arg1)
      .replace(/ 2 /, arg2);

    return this.getData(url)
      .flatMap(it => {
        return Rx.Observable.from(it.data.book_info);
      });
  }

  getBookEpisodes(arg1) {
    const url = this.urlGetBookEpisodes
      .replace(/ 1 /, arg1);

    return this.getData(url)
      .flatMap(it => {
        return Rx.Observable.from(it.data.book_episode_list_info);
      });
  }

  getBookEpisodePages(arg1, arg2, arg3) {
    const url = this.urlGetBookEpisodePages
      .replace(/ 1 /, arg1)
      .replace(/ 2 /, arg2)
      .replace(/ 3 /, arg3);

    return this.getData(url)
      .flatMap(it => {
        return Rx.Observable.from(it.data.book_res_info);
      });
  }

  getUser(arg1) {
    const url = this.urlGetUser
      .replace(/ 1 /, arg1);
  
    return this.getData(url)
      .flatMap(data => {
        return Rx.Observable.of(data.data);
      });
  }

}

module.exports = Api;
